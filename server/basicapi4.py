from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from datetime import datetime
import mysql.connector
import bcrypt 

app = Flask(__name__) 
cors = CORS(app)
app.config['JSON_SORT_KEYS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'

#Time configuration
db_f = '%Y-%m-%d %H:%M:%S' # Database datetime format
disp_f = '%d-%m-%Y %I:%M %p' #Display datetime format
given_f = "%a %b %d %Y %H:%M:%S " # Thu Sep 28 2023 00:15:45 (from user input)
give_f = "%a %b %d %Y %H:%M:%S" # Thu Sep 28 2023 00:15:45 GMT+0800 (Singapore Standard Time) {} (for user edit)

nowDT_raw = datetime.now()
nowDT = nowDT_raw.replace(second=0, microsecond=0)
currentDT = nowDT.strftime(db_f)

#Database connection
mydb = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password = 'Mysql@12345678',
    database = 'InsuranceProgram'
)

#-----------------------------------------------------------------------------------
#check if claim exist
#-----------------------------------------------------------------------------------
def claim_exists(claim_id):
    mycursor = mydb.cursor()
    sql = "SELECT ClaimID FROM InsuranceClaims WHERE ClaimID = %s"
    val = (claim_id,)
    mycursor.execute(sql, val)
    myresult = mycursor.fetchall()
    mycursor.close()

    if myresult:
        return True
    else:
        return False
    
#-----------------------------------------------------------------------------------
#check dateformat
#-----------------------------------------------------------------------------------
def checkdate(datestr):   
    # using try-except to check for truth value
    result = True
    try:
        res = bool(datetime.strptime(datestr, given_f))
    except ValueError:
        result = False
    
    return result

#-----------------------------------------------------------------------------------
#fetch new claim id
#-----------------------------------------------------------------------------------
def new_claim_id():
    try:
        mycursor = mydb.cursor()
        mycursor.execute("SELECT MAX(ClaimID) as claim_id from InsuranceClaims")
        myresult = mycursor.fetchall()
        mycursor.close()
    except mysql.connector.Error as e:
        return ("Something went wrong: {}".format(e))
    return myresult[0][0]+1


#----------------------------------------------------------------------------------- 
#check login credential
#----------------------------------------------------------------------------------- 
@app.route('/login_check', methods = ['GET'])
@cross_origin()
def login_check():
    if "emp_id" not in request.args:
        return {'error':'Employee ID not provided'}
    elif "password" not in request.args:
        return {'error':'Password not provided'}
    else:
        emp_id = request.args.get('emp_id')
        password_input = request.args.get('password')

        print(request.args.get)

        try:
            mycursor = mydb.cursor()
            sql = "SELECT EmployeeID, Password, FirstName FROM User WHERE EmployeeID = %s"
            val = (emp_id,)
            mycursor.execute(sql, val)
            myresult = mycursor.fetchone()
            mycursor.close()

            if myresult:
                acct_list = []

                EmployeeID = myresult[0]
                Password_raw = myresult[1]
                FirstName = myresult[2]

                #check encrypted password
                password_input2 = password_input.encode('utf-8') 
                userBytes = Password_raw.encode('utf-8') 
                result = bcrypt.checkpw(userBytes, password_input2)

                if not result:
                    return {'error':'Invalid Credential'}
                else:
                    acct = {
                                'EmployeeID':EmployeeID,
                                'FirstName':FirstName,
                                'Result': result
                            }

                
                    acct_list.append(acct)

                    return jsonify(acct_list)
            else:
                #user not found
                return {'error':'Invalid Credential'}


        except mysql.connector.Error as e:
            return ("Something went wrong: {}".format(e))

#----------------------------------------------------------------------------------- 
#Retrieve claims based on Employee ID
#----------------------------------------------------------------------------------- 
@app.route('/claims', methods = ['GET'])
@cross_origin()
def claims():
    if "emp_id" not in request.args:
        return {'error':'Employee ID not provided'}
    else:
        emp_id = request.args.get('emp_id')

        try:
            mycursor = mydb.cursor()
            sql = "SELECT A.ClaimID, B.InsuranceType, A.ExpenseDate, A.Amount, A.Purpose, A.PreviousClaimID, A.Status "
            sql += "FROM InsuranceClaims A, InsurancePolicies B, User C "
            sql += "WHERE A.InsuranceID = B.InsuranceID "
            sql += "AND B.EmployeeID = C.EmployeeID "
            sql += "AND C.EmployeeID = %s"
            sql += "ORDER BY A.ClaimID ASC"
            val = (emp_id,)
            mycursor.execute(sql, val)
            myresult = mycursor.fetchall()
            mycursor.close()

            claims = []

            if myresult:
                for claim in myresult:
                    ClaimID = claim[0]
                    InsuranceType = claim[1]
                    Amount = str(claim[3])
                    Purpose = claim[4]
                    PreviousClaimID = claim[5]
                    Status = claim[6]

                    ExpenseDate_raw = claim[2]
                    ExpenseDate_raw2 = datetime.strptime(ExpenseDate_raw, db_f)
                    ExpenseDate = ExpenseDate_raw2.strftime(disp_f)

                    new_claim = {
                        'ClaimID':ClaimID, 
                        'InsuranceType':InsuranceType,
                        'ExpenseDate':ExpenseDate,
                        'Amount':Amount,
                        'Purpose':Purpose,
                        'PreviousClaimID':PreviousClaimID,
                        'Status':Status,
                    }
                    claims.append(new_claim)
            
            return jsonify(claims)

        except mysql.connector.Error as e:
            return ("Something went wrong: {}".format(e))
        
#----------------------------------------------------------------------------------- 
#Retrieve claim based on Claim ID
#----------------------------------------------------------------------------------- 
@app.route('/claim', methods = ['GET'])
@cross_origin()
def claim():
    if "claim_id" not in request.args:
        return {'error':'Claim ID not provided'}
    else:
        claim_id = request.args.get('claim_id')

        try:
            mycursor = mydb.cursor()
            sql = "SELECT ClaimID, InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID "
            sql += "FROM InsuranceClaims "
            sql += "WHERE ClaimID = %s "
            sql += "ORDER BY ClaimID ASC"
            val = (claim_id,)
            mycursor.execute(sql, val)
            myresult = mycursor.fetchall()
            mycursor.close()

            claims = []

            # print(myresult)

            if myresult:
                claim = myresult[0]

                ClaimID = claim[0]
                InsuranceID = claim[1]
                FirstName = claim[2]
                LastName = claim[3]
                Amount = str(claim[5])
                Purpose = claim[6]
                FollowUp_raw = claim[7]
                PreviousClaimID = claim[8]


                ExpenseDate_raw = claim[4]
                ExpenseDate_raw2 = datetime.strptime(ExpenseDate_raw, db_f)
                ExpenseDate = ExpenseDate_raw2.strftime(give_f)

                if(FollowUp_raw == 1):
                    FollowUp = True
                else:
                    FollowUp = False

                new_claim = {
                    'ClaimID':ClaimID, 
                    'InsuranceID':InsuranceID,
                    'FirstName':FirstName,
                    'LastName':LastName,
                    'ExpenseDate':ExpenseDate,
                    'Amount':Amount,
                    'Purpose':Purpose,
                    'FollowUp': FollowUp,
                    'PreviousClaimID':PreviousClaimID
                }
                
                claims.append(new_claim)
            
            return jsonify(claims)

        except mysql.connector.Error as e:
            return ("Something went wrong: {}".format(e))

#----------------------------------------------------------------------------------- 
#Retrieve Policies list
#----------------------------------------------------------------------------------- 
@app.route('/policies', methods = ['GET'])
@cross_origin()
def projects():
    if "emp_id" not in request.args:
        return {'error':'Employee ID not provided'}
    else:
        emp_id = request.args.get('emp_id')

    try:
        mycursor = mydb.cursor()
        sql = "SELECT InsuranceID, InsuranceType FROM InsurancePolicies WHERE EmployeeID = %s"
        val = (emp_id,)
        mycursor.execute(sql, val)
        myresult = mycursor.fetchall()
        mycursor.close()

        Policies = []

        if myresult:
            for Policy in myresult:
                InsuranceID = Policy[0]
                InsuranceType = Policy[1]

                new_policy = {
                            'InsuranceID':InsuranceID, 
                            'InsuranceType':InsuranceType
                        }
                Policies.append(new_policy)
        
        return jsonify(Policies)

    except mysql.connector.Error as e:
        return ("Something went wrong: {}".format(e))


#-----------------------------------------------------------------------------------
# Add claims
#-----------------------------------------------------------------------------------  
@app.route('/addclaim', methods = ['POST'])
@cross_origin()
def addclaim():
    claim_info = request.json
    if not claim_info:
            return {'error': 'Claim data not provide'}
    
    print(claim_info)
    #-------------------------------
    #Prepare values
    #-------------------------------
    if "InsuranceID" not in claim_info:
        return "error: InsuranceID not provided"
    elif not isinstance(claim_info['InsuranceID'], int):
        return "error: Invalid InsuranceID"
    else:
        InsuranceID = claim_info['InsuranceID']

    #-------------------------------
    if "EmployeeID" not in claim_info:
        return "error: EmployeeID not provided"
    elif not isinstance(claim_info['EmployeeID'], int):
        return "error: Invalid EmployeeID"
    else:
        EmployeeID = claim_info['EmployeeID']
    
    #-------------------------------
    if "FirstName" not in claim_info:
        return "error: FirstName not provided"
    else:
        FirstName = claim_info['FirstName']

    #-------------------------------
    if "LastName" not in claim_info:
        return "error: LastName not provided"
    else:
        LastName = claim_info['LastName']
    
    
    #-------------------------------
    if "ExpenseDate" not in claim_info:
        return "error: ExpenseDate not provided"
    else:
        ExpenseDate_raw = claim_info['ExpenseDate']
        ExpenseDate_raw2 = ExpenseDate_raw[0:25] # Thu Sep 28 2023 00:15:45 GMT+0800 (Singapore Standard Time) {}
    if not checkdate(ExpenseDate_raw2):
        return "error: ExpenseDate format incorrect"
    else:
        raw_dt = datetime.strptime(ExpenseDate_raw2, given_f)
        ExpenseDate = raw_dt.strftime(db_f)
    
    #-------------------------------
    if "Amount" not in claim_info:
        return "error: Amount not provided"
    else:
        Amount = claim_info['Amount']
    
    #-------------------------------
    if "Purpose" not in claim_info:
        return "error: Purpose not provided"
    else:
        Purpose = claim_info['Purpose']
    
    #-------------------------------
    x = [0, 1]
    if "FollowUp" not in claim_info:
        return "error: FollowUp not provided"
    elif claim_info['FollowUp'] not in x:
        return "error: Invalid FollowUp"
    else:
        FollowUp = claim_info['FollowUp']

    #-------------------------------
    #get claim id
    ClaimID = new_claim_id()
    if not isinstance(ClaimID, int):
        return ClaimID
    
     #-------------------------------
    Status = "Pending"

    #-------------------------------
    LastEdit = currentDT
    

    #-------------------------------
    if "PreviousClaimID" in claim_info:
        if isinstance(claim_info['PreviousClaimID'], int):
            PreviousClaimID = claim_info['PreviousClaimID']
            query = "INSERT INTO InsuranceClaims (ClaimID, InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            val = (ClaimID, InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEdit) 
        else:
            return "error: Invalid PreviousClaimID"
    else:
        query = "INSERT INTO InsuranceClaims (ClaimID, InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, Status, LastEditedClaimDate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (ClaimID, InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, Status, LastEdit) 

   
    #-------------------------------
    try:
        mycursor = mydb.cursor()
        mycursor.execute(query, val)
        mydb.commit()
        mycursor.close()
    except mysql.connector.Error as e:
        return ("Something went wrong: {}".format(e))
    
    return {"status":"Successfully insert"}


#-----------------------------------------------------------------------------------
# Edit claims
#-----------------------------------------------------------------------------------  
@app.route('/editclaim', methods = ['PUT'])
@cross_origin()
def editclaim():
    claim_info = request.json
    if not claim_info:
            return {'error': 'Claim data not provide'}
    
    #-------------------------------
    #Prepare values
    #-------------------------------
    if "ClaimID" not in claim_info:
        return "error: ClaimID not provided"
    elif not isinstance(claim_info['ClaimID'], int):
        return "error: Invalid ClaimID"
    else:
        ClaimID = claim_info['ClaimID']

    #-------------------------------
    if "InsuranceID" not in claim_info:
        return "error: InsuranceID not provided"
    elif not isinstance(claim_info['InsuranceID'], int):
        return "error: Invalid InsuranceID"
    else:
        InsuranceID = claim_info['InsuranceID']

    #-------------------------------
    if "FirstName" not in claim_info:
        return "error: FirstName not provided"
    else:
        FirstName = claim_info['FirstName']
    
    #-------------------------------
    if "LastName" not in claim_info:
        return "error: LastName not provided"
    else:
        LastName = claim_info['LastName']
    
    #-------------------------------
    if "ExpenseDate" not in claim_info:
        return "error: ExpenseDate not provided"
    else:
        ExpenseDate_raw = claim_info['ExpenseDate']
        ExpenseDate_raw2 = ExpenseDate_raw[0:25] # Thu Sep 28 2023 00:15:45 GMT+0800 (Singapore Standard Time) {}
    if not checkdate(ExpenseDate_raw2):
        return "error: ExpenseDate format incorrect"
    else:
        raw_dt_raw = datetime.strptime(ExpenseDate_raw2, given_f)
        raw_dt = raw_dt_raw.replace(second=0, microsecond=0)
        ExpenseDate = raw_dt.strftime(db_f)
    
    #-------------------------------
    if "Amount" not in claim_info:
        return "error: Amount not provided"
    else:
        Amount = claim_info['Amount']
    
    #-------------------------------
    if "Purpose" not in claim_info:
        return "error: Purpose not provided"
    else:
        Purpose = claim_info['Purpose']
    
    #-------------------------------
    x = [0, 1]
    if "FollowUp" not in claim_info:
        return "error: FollowUp not provided"
    elif claim_info['FollowUp'] not in x:
        return "error: Invalid FollowUp"
    else:
        FollowUp = claim_info['FollowUp']

    #-------------------------------
    if "PreviousClaimID" in claim_info:
        if isinstance(claim_info['PreviousClaimID'], int):
            PreviousClaimID = claim_info['PreviousClaimID']
        else:
            return "error: Invalid PreviousClaimID"

    #-------------------------------
    LastEdit = currentDT
    
    #-------------------------------
    try:
        mycursor = mydb.cursor()
        query = "UPDATE InsuranceClaims SET InsuranceID = %s, FirstName = %s, LastName = %s, ExpenseDate = %s, Amount = %s, Purpose = %s, FollowUp = %s, PreviousClaimID = %s, LastEditedClaimDate = %s WHERE ClaimID = %s"
        val = (InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, LastEdit, ClaimID) 
        mycursor.execute(query, val)
        mydb.commit()
        mycursor.close()
    except mysql.connector.Error as e:
        return ("Something went wrong: {}".format(e))
    
    return {"status":"Successfully edit"}

#-----------------------------------------------------------------------------------
# Cancel claims
#-----------------------------------------------------------------------------------            
@app.route('/cancelclaim', methods = ['PUT'])
@cross_origin()
def cancelclaim():
    claim = request.json
    if not claim:
            return {'error': 'claim not provide'}

    if "ClaimID" not in claim:
        return "error: ClaimID not provided"
    
    ClaimID = claim['ClaimID']

    check_claim = claim_exists(ClaimID)
    
    if not check_claim:
        #entered claim do not exist
        return {'error':'Claim do not exist'}
    else:
        #claim exist do 
        try:
            mycursor = mydb.cursor()
            query = "UPDATE InsuranceClaims SET Status = 'Cancelled' WHERE ClaimID =%s"
            val = (ClaimID,) 
            mycursor.execute(query, val)
            mydb.commit()
            mycursor.close()
        except mysql.connector.Error as e:
            return ("Something went wrong: {}".format(e))
        
        returnstatus = {
            "ClaimID": str(ClaimID),
            "Status": "Cancelled"
        }
        
        return jsonify(returnstatus)
    
#-----------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------  


if __name__ == '__main__': 
    app.run(debug=True)