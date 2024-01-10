from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from datetime import datetime
import mysql.connector
import bcrypt 

app = Flask(__name__) 
cors = CORS(app)
app.config['JSON_SORT_KEYS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'

nowDT_raw = datetime.now()
f = '%Y-%m-%d %H:%M:%S'
disp_f = '%d-%m-%Y %I:%M %p'
# given_f = "%d/%m/%Y %H:%M:%S" # Thu Sep 28 2023 00:15:45 GMT+0800 (Singapore Standard Time) {}
given_f = "%a %b %d %Y %H:%M:%S " # Thu Sep 28 2023 00:15:45 
give_f = "%a %b %d %Y %H:%M:%S" # Thu Sep 28 2023 00:15:45 GMT+0800 (Singapore Standard Time) {}

nowDT = nowDT_raw.replace(second=0, microsecond=0)
currentDT = nowDT.strftime(f)


#Database connection
mydb = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password = 'Mysql@12345678',
    database = 'expenseclaimsdata'
)

#-----------------------------------------------------------------------------------
#check if claim exist
#-----------------------------------------------------------------------------------
def claim_exists(claim_id):
    mycursor = mydb.cursor()
    sql = "SELECT ClaimID FROM projectexpenseclaims WHERE ClaimID = %s"
    val = (claim_id,)
    mycursor.execute(sql, val)
    myresult = mycursor.fetchall()
    mycursor.close()

    if myresult:
        return True
    else:
        return False

#-----------------------------------------------------------------------------------
#fetch new claim id
#-----------------------------------------------------------------------------------
def new_claim_id():
    try:
        mycursor = mydb.cursor()
        mycursor.execute("SELECT MAX(ClaimID) as claim_id from projectexpenseclaims")
        myresult = mycursor.fetchall()
        mycursor.close()
    except mysql.connector.Error as e:
        return ("Something went wrong: {}".format(e))
    return myresult[0][0]+1

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

        try:
            mycursor = mydb.cursor()
            sql = "SELECT EmployeeID, Password, FirstName FROM employee WHERE EmployeeID = %s"
            val = (emp_id,)
            mycursor.execute(sql, val)
            myresult = mycursor.fetchone()
            mycursor.close()

            if myresult:
                acct_list = []

                EmployeeID = myresult[0]
                FirstName = myresult[2]
                Password_raw = myresult[1]

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
            sql = "SELECT A.ClaimID, A.ProjectID, B.ProjectName, A.CurrencyID, A.ExpenseDate, A.Amount, A.Purpose, A.Status FROM projectexpenseclaims A, employeeprojects B WHERE A.ProjectID = B.ProjectID AND A.EmployeeID = %s"
            val = (emp_id,)
            mycursor.execute(sql, val)
            myresult = mycursor.fetchall()
            mycursor.close()

            claims = []

            if myresult:
                for claim in myresult:
                    ClaimID = claim[0]
                    ProjectID = claim[1]
                    ProjectName = claim[2]
                    CurrencyID = claim[3]
                    ExpenseDate = claim[4].strftime(disp_f)
                    Amount = str(claim[5])
                    Purpose = claim[6]
                    Status = claim[7]

                    new_claim = {
                                'ClaimID':ClaimID, 
                                'ProjectID':ProjectID,
                                'ProjectName':ProjectName,
                                'CurrencyID':CurrencyID,
                                'ExpenseDate':ExpenseDate,
                                'ProjectID':ProjectID,
                                'Amount':Amount,
                                'Purpose':Purpose,
                                'Status':Status
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
            sql = "SELECT ClaimID, ProjectID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode FROM projectexpenseclaims WHERE ClaimID = %s"
            val = (claim_id,)
            mycursor.execute(sql, val)
            myresult = mycursor.fetchall()
            mycursor.close()

            claims = []

            if myresult:
                claim = myresult[0]

                ClaimID = claim[0]
                ProjectID = claim[1]
                CurrencyID = claim[2]
                ExpenseDate = claim[3].strftime(give_f)
                Amount = str(claim[4])
                Purpose = claim[5]
                ChargeToDefaultDept_raw = claim[6]
                AlternativeDeptCode = claim[7]

                if(ChargeToDefaultDept_raw == 1):
                    ChargeToDefaultDept = True
                else:
                    ChargeToDefaultDept = False

                new_claim = {
                            'ClaimID':ClaimID, 
                            'ProjectID':ProjectID,
                            'CurrencyID':CurrencyID,
                            'ExpenseDate':ExpenseDate,
                            'ProjectID':ProjectID,
                            'Amount':Amount,
                            'Purpose':Purpose,
                            'ChargeToDefaultDept':ChargeToDefaultDept,
                            'AlternativeDeptCode': AlternativeDeptCode
                        }
                
                claims.append(new_claim)
            
            return jsonify(claims)

        except mysql.connector.Error as e:
            return ("Something went wrong: {}".format(e))
        
#----------------------------------------------------------------------------------- 
#Retrieve project list
#----------------------------------------------------------------------------------- 
@app.route('/projects', methods = ['GET'])
@cross_origin()
def projects():
    # if "emp_id" not in request.args:
    #     return {'error':'Employee ID not provided'}
    # else:
    #     emp_id = request.args.get('emp_id')

    try:
        mycursor = mydb.cursor()
        sql = "SELECT ProjectID, ProjectName FROM employeeprojects"
        mycursor.execute(sql)
        # sql = "SELECT ProjectID, ProjectName FROM employeeprojects WHERE EmployeeID = %s"
        # val = (emp_id,)
        # mycursor.execute(sql, val)
        myresult = mycursor.fetchall()
        mycursor.close()

        projects = []

        if myresult:
            for project in myresult:
                ProjectID = project[0]
                ProjectName = project[1]

                new_proj = {
                            'ProjectID':ProjectID, 
                            'ProjectName':ProjectName
                        }
                projects.append(new_proj)
        
        return jsonify(projects)

    except mysql.connector.Error as e:
        return ("Something went wrong: {}".format(e))
        
#----------------------------------------------------------------------------------- 
#Retrieve currency list
#----------------------------------------------------------------------------------- 
@app.route('/currencies', methods = ['GET'])
@cross_origin()
def currencies():
    try:
        mycursor = mydb.cursor()
        sql = "select CurrencyID from currency"
        mycursor.execute(sql)
        myresult = mycursor.fetchall()
        mycursor.close()

        currencies = []

        if myresult:
            for currency in myresult:
                CurrencyID = currency[0]

                new_ccy = {
                            'CurrencyID': CurrencyID
                        }
                currencies.append(new_ccy)
        
        return jsonify(currencies)

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
    
    #-------------------------------
    #Prepare values
    #-------------------------------
    if "ProjectID" not in claim_info:
        return "ERROR: ProjectID not provided"
    elif not isinstance(claim_info['ProjectID'], int):
        return "ERROR: Invalid ProjectID"
    else:
        ProjectID = claim_info['ProjectID']

    #-------------------------------
    if "EmployeeID" not in claim_info:
        return "ERROR: EmployeeID not provided"
    elif not isinstance(claim_info['EmployeeID'], int):
        return "ERROR: Invalid EmployeeID"
    else:
        EmployeeID = claim_info['EmployeeID']
    
    #-------------------------------
    if "CurrencyID" not in claim_info:
        return "ERROR: CurrencyID not provided"
    else:
        CurrencyID = claim_info['CurrencyID']
    
    #-------------------------------
    if "ExpenseDate" not in claim_info:
        return "ERROR: ExpenseDate not provided"
    else:
        ExpenseDate_raw = claim_info['ExpenseDate']
        ExpenseDate_raw2 = ExpenseDate_raw[0:25] # Thu Sep 28 2023 00:15:45 GMT+0800 (Singapore Standard Time) {}
    if not checkdate(ExpenseDate_raw2):
        return "ERROR: ExpenseDate format incorrect"
    else:
        raw_dt_raw = datetime.strptime(ExpenseDate_raw2, given_f)
        raw_dt = raw_dt_raw.replace(second=0, microsecond=0)
        ExpenseDate = raw_dt.strftime(f)
    
    #-------------------------------
    if "Amount" not in claim_info:
        return "ERROR: Amount not provided"
    else:
        Amount = claim_info['Amount']
    
    #-------------------------------
    if "Purpose" not in claim_info:
        return "ERROR: Purpose not provided"
    else:
        Purpose = claim_info['Purpose']
    
    #-------------------------------
    x = [0, 1]
    if "ChargetoDefault" not in claim_info:
        return "ERROR: ChargetoDefault not provided"
    elif claim_info['ChargetoDefault'] not in x:
        return "ERROR: Invalid ChargetoDefault"
    else:
        ChargetoDefault = claim_info['ChargetoDefault']

    #-------------------------------
    #get claim id
    ClaimID = new_claim_id()
    if not isinstance(ClaimID, int):
        return ClaimID
    
    #-------------------------------
    if "AlternativeDept" in claim_info:
        AlternativeDept = claim_info['AlternativeDept']
    else:
        AlternativeDept = ''

    #-------------------------------
    Status = "Pending"

    #-------------------------------
    LastEdit = currentDT
    
    #-------------------------------
    try:
        mycursor = mydb.cursor()
        query = "INSERT INTO projectexpenseclaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargetoDefault, AlternativeDept, Status, LastEdit) 
        mycursor.execute(query, val)
        mydb.commit()
        mycursor.close()
    except mysql.connector.Error as e:
        return ("Something went wrong: {}".format(e))
    
    return {"status":"Successfully insert"}

#-----------------------------------------------------------------------------------
# Cancel claims
#-----------------------------------------------------------------------------------            
@app.route('/cancelclaim', methods = ['PUT'])
@cross_origin()
def cancelclaim():
    claim = request.json
    if not claim:
            return {'error': 'claim not provide'}

    if "claim_id" not in claim:
        return "ERROR: claim_id not provided"
    
    claim_id = claim['claim_id']

    check_claim = claim_exists(claim_id)
    
    if not check_claim:
        #entered claim do not exist
        return {'error':'Claim do not exist'}
    else:
        #claim exist do 
        try:
            mycursor = mydb.cursor()
            query = "UPDATE projectexpenseclaims SET Status = 'Cancelled' WHERE ClaimID =%s"
            val = (claim_id,) 
            mycursor.execute(query, val)
            mydb.commit()
            mycursor.close()
        except mysql.connector.Error as e:
            return ("Something went wrong: {}".format(e))
        
        returnstatus = {
            "ClaimID": str(claim_id),
            "Status": "Cancelled"
        }
        
        return jsonify(returnstatus)
    

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
    if "ProjectID" not in claim_info:
        return "ERROR: ProjectID not provided"
    elif not isinstance(claim_info['ProjectID'], int):
        return "ERROR: Invalid ProjectID"
    else:
        ProjectID = claim_info['ProjectID']

    #-------------------------------
    if "EmployeeID" not in claim_info:
        return "ERROR: EmployeeID not provided"
    elif not isinstance(claim_info['EmployeeID'], int):
        return "ERROR: Invalid EmployeeID"
    else:
        EmployeeID = claim_info['EmployeeID']
    
    #-------------------------------
    if "CurrencyID" not in claim_info:
        return "ERROR: CurrencyID not provided"
    else:
        CurrencyID = claim_info['CurrencyID']
    
    #-------------------------------
    if "ExpenseDate" not in claim_info:
        return "ERROR: ExpenseDate not provided"
    else:
        ExpenseDate_raw = claim_info['ExpenseDate']
        ExpenseDate_raw2 = ExpenseDate_raw[0:25] # Thu Sep 28 2023 00:15:45 GMT+0800 (Singapore Standard Time) {}
    if not checkdate(ExpenseDate_raw2):
        return "ERROR: ExpenseDate format incorrect"
    else:
        raw_dt_raw = datetime.strptime(ExpenseDate_raw2, given_f)
        raw_dt = raw_dt_raw.replace(second=0, microsecond=0)
        ExpenseDate = raw_dt.strftime(f)
    
    #-------------------------------
    if "Amount" not in claim_info:
        return "ERROR: Amount not provided"
    else:
        Amount = claim_info['Amount']
    
    #-------------------------------
    if "Purpose" not in claim_info:
        return "ERROR: Purpose not provided"
    else:
        Purpose = claim_info['Purpose']
    
    #-------------------------------
    x = [0, 1]
    if "ChargetoDefault" not in claim_info:
        return "ERROR: ChargetoDefault not provided"
    elif claim_info['ChargetoDefault'] not in x:
        return "ERROR: Invalid ChargetoDefault"
    else:
        ChargetoDefault = claim_info['ChargetoDefault']

    #-------------------------------
    #get claim id
    if "ClaimID" not in claim_info:
        return "ERROR: ClaimID not provided"
    else:
        ClaimID = claim_info['ClaimID']
    
    #-------------------------------
    if "AlternativeDept" in claim_info:
        AlternativeDept = claim_info['AlternativeDept']
    else:
        AlternativeDept = ''

    #-------------------------------
    Status = "Pending"

    #-------------------------------
    LastEdit = currentDT
    
    #-------------------------------
    try:
        mycursor = mydb.cursor()
        query = "UPDATE projectexpenseclaims SET ProjectID = %s, EmployeeID = %s, CurrencyID = %s, ExpenseDate = %s, Amount = %s, Purpose = %s, ChargeToDefaultDept = %s, AlternativeDeptCode = %s, Status = %s, LastEditedClaimDate = %s WHERE ClaimID = %s"
        val = (ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargetoDefault, AlternativeDept, Status, LastEdit, ClaimID) 
        # print(query)
        mycursor.execute(query, val)
        mydb.commit()
        mycursor.close()
    except mysql.connector.Error as e:
        return ("Something went wrong: {}".format(e))
    
    return {"status":"Successfully edit"}
    

#-----------------------------------------------------------------------------------
# Delete claims
#-----------------------------------------------------------------------------------            
# @app.route('/deleteclaim', methods = ['DELETE'])
# @cross_origin()
# def deleteclaim():
#     claim = request.json
#     if not claim:
#             return {'error': 'claim_id not provide'}

#     if "claim_id" not in claim:
#         return "ERROR: claim_id not provided"
    
#     claim_id = claim['claim_id']

#     check_claim = claim_exists(claim_id)
    
#     if not check_claim:
#         #entered claim do not exist
#         return {'error':'Claim do not exist'}
#     else:
#         #claim exist do 
#         try:
#             mycursor = mydb.cursor()
#             query = "DELETE FROM projectexpenseclaims WHERE ClaimID = %s"
#             val = (claim_id,) 
#             mycursor.execute(query, val)
#             mydb.commit()
#             mycursor.close()
#         except mysql.connector.Error as e:
#             return ("Something went wrong: {}".format(e))
        
#         return {"status":"Successfully Delete: Claim ID - " + claim_id}
    
    
#-----------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------  


if __name__ == '__main__': 
    app.run(debug=True)