#build mongo database for basicapi4
import pymongo

#database connection
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mydatabase3'] #create database
mycol = mydb["projectexpenseclaims"] #create collection/tables

#Insert data
mylist = [
        {
          "ClaimID": "11147",
          "ProjectID": "10001",
          "CurrencyID": "SGD",
          "EmployeeID": "10011",
          "ExpenseDate": "2023-04-29T08:30:00+08:00",
          "Amount": "100.50",
          "Purpose": "Banking tech",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T10:00:00+08:00"
        },
        {
          "ClaimID": "11148",
          "ProjectID": "10002",
          "CurrencyID": "IDR",
          "EmployeeID": "10015",
          "ExpenseDate": "2023-04-28T10:00:00+08:00",
          "Amount": "250.75",
          "Purpose": "Operations",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-30T11:30:00+08:00"
        },
        {
          "ClaimID": "11149",
          "ProjectID": "10003",
          "CurrencyID": "JPY",
          "EmployeeID": "10014",
          "ExpenseDate": "2023-04-27T13:45:00+08:00",
          "Amount": "500.00",
          "Purpose": "Banking operations",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Rejected",
          "LastEditedClaimDate": "2023-04-30T12:15:00+08:00"
        },
        {
          "ClaimID": "11150",
          "ProjectID": "10004",
          "CurrencyID": "SGD",
          "EmployeeID": "10018",
          "ExpenseDate": "2023-04-26T15:30:00+08:00",
          "Amount": "175.25",
          "Purpose": "Banking tech",
          "ChargeToDefaultDept": "1",
          "AlternativeDeptCode": "105",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T13:00:00+08:00"
        },
        {
          "ClaimID": "11151",
          "ProjectID": "10005",
          "CurrencyID": "KRW",
          "EmployeeID": "10020",
          "ExpenseDate": "2023-04-25T17:15:00+08:00",
          "Amount": "350.00",
          "Purpose": "Banking operations",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T14:30:00+08:00"
        },
        {
          "ClaimID": "11152",
          "ProjectID": "10006",
          "CurrencyID": "IDR",
          "EmployeeID": "10012",
          "ExpenseDate": "2023-04-24T19:00:00+08:00",
          "Amount": "50.00",
          "Purpose": "Banking tech",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-30T15:45:00+08:00"
        },
        {
          "ClaimID": "11164",
          "ProjectID": "10004",
          "CurrencyID": "SGD",
          "EmployeeID": "10011",
          "ExpenseDate": "2023-04-29T10:00:00+08:00",
          "Amount": "25.0",
          "Purpose": "IT support",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-29T10:30:00+08:00"
        },
        {
          "ClaimID": "11165",
          "ProjectID": "10005",
          "CurrencyID": "IDR",
          "EmployeeID": "10012",
          "ExpenseDate": "2023-04-28T14:30:00+08:00",
          "Amount": "2000000.0",
          "Purpose": "Hardware purchase",
          "ChargeToDefaultDept": "1",
          "AlternativeDeptCode": "105",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-29T09:30:00+08:00"
        },
        {
          "ClaimID": "11166",
          "ProjectID": "10002",
          "CurrencyID": "KRW",
          "EmployeeID": "10011",
          "ExpenseDate": "2023-04-28T16:45:00+08:00",
          "Amount": "15000.0",
          "Purpose": "Printing materials",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Rejected",
          "LastEditedClaimDate": "2023-04-29T11:00:00+08:00"
        },
        {
          "ClaimID": "11167",
          "ProjectID": "10007",
          "CurrencyID": "VND",
          "EmployeeID": "10012",
          "ExpenseDate": "2023-04-27T13:15:00+08:00",
          "Amount": "750000.0",
          "Purpose": "Data entry software",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-29T08:45:00+08:00"
        },
        {
          "ClaimID": "11168",
          "ProjectID": "10006",
          "CurrencyID": "CNY",
          "EmployeeID": "10016",
          "ExpenseDate": "2023-04-26T11:30:00+08:00",
          "Amount": "500.0",
          "Purpose": "Office supplies",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-29T10:15:00+08:00"
        },
        {
          "ClaimID": "11169",
          "ProjectID": "10010",
          "CurrencyID": "TWD",
          "EmployeeID": "10019",
          "ExpenseDate": "2023-04-25T09:45:00+08:00",
          "Amount": "8000.0",
          "Purpose": "Telecommunications",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-29T09:00:00+08:00"
        },
        {
          "ClaimID": "11156",
          "ProjectID": "10006",
          "CurrencyID": "JPY",
          "EmployeeID": "10018",
          "ExpenseDate": "2023-04-29T09:12:00+08:00",
          "Amount": "5000.00",
          "Purpose": "Banking software upgrade",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-30T13:28:00+08:00"
        },
        {
          "ClaimID": "11157",
          "ProjectID": "10007",
          "CurrencyID": "IDR",
          "EmployeeID": "10020",
          "ExpenseDate": "2023-04-28T11:30:00+08:00",
          "Amount": "1000000.00",
          "Purpose": "Operations software license fee",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T13:30:00+08:00"
        },
        {
          "ClaimID": "11158",
          "ProjectID": "10002",
          "CurrencyID": "SGD",
          "EmployeeID": "10016",
          "ExpenseDate": "2023-04-27T15:45:00+08:00",
          "Amount": "250.00",
          "Purpose": "Banking conference registration fee",
          "ChargeToDefaultDept": "1",
          "AlternativeDeptCode": "104",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T13:32:00+08:00"
        },
        {
          "ClaimID": "11159",
          "ProjectID": "10008",
          "CurrencyID": "INR",
          "EmployeeID": "10010",
          "ExpenseDate": "2023-04-26T10:20:00+08:00",
          "Amount": "7500.00",
          "Purpose": "Operations training program fee",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-30T13:34:00+08:00"
        },
        {
          "ClaimID": "11160",
          "ProjectID": "10009",
          "CurrencyID": "KHR",
          "EmployeeID": "10019",
          "ExpenseDate": "2023-04-25T14:00:00+08:00",
          "Amount": "150.00",
          "Purpose": "Banking seminar fee",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Rejected",
          "LastEditedClaimDate": "2023-04-30T13:36:00+08:00"
        },
        {
          "ClaimID": "11161",
          "ProjectID": "10003",
          "CurrencyID": "HKD",
          "EmployeeID": "10015",
          "ExpenseDate": "2023-04-24T12:30:00+08:00",
          "Amount": "2000.00",
          "Purpose": "Operations software upgrade",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T13:38:00+08:00"
        },
        {
          "ClaimID": "11170",
          "ProjectID": "10009",
          "CurrencyID": "SGD",
          "EmployeeID": "10019",
          "ExpenseDate": "2023-04-27T10:12:45+08:00",
          "Amount": "232.50",
          "Purpose": "IT infrastructure upgrade",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "105",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-29T13:45:00+08:00"
        },
        {
          "ClaimID": "11171",
          "ProjectID": "10001",
          "CurrencyID": "JPY",
          "EmployeeID": "10016",
          "ExpenseDate": "2023-04-28T08:30:15+08:00",
          "Amount": "15900.00",
          "Purpose": "Bank reconciliation software",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-29T14:25:00+08:00"
        },
        {
          "ClaimID": "11172",
          "ProjectID": "10010",
          "CurrencyID": "INR",
          "EmployeeID": "10010",
          "ExpenseDate": "2023-04-28T16:45:30+08:00",
          "Amount": "4500.00",
          "Purpose": "Teleconferencing equipment",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-29T15:10:00+08:00"
        },
        {
          "ClaimID": "11173",
          "ProjectID": "10008",
          "CurrencyID": "IDR",
          "EmployeeID": "10012",
          "ExpenseDate": "2023-04-29T09:15:00+08:00",
          "Amount": "2100000.00",
          "Purpose": "Core banking system upgrade",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T09:20:00+08:00"
        },
        {
          "ClaimID": "11174",
          "ProjectID": "10005",
          "CurrencyID": "TWD",
          "EmployeeID": "10013",
          "ExpenseDate": "2023-04-29T11:30:45+08:00",
          "Amount": "20000.00",
          "Purpose": "Mobile banking app development",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T11:45:00+08:00"
        },
        {
          "ClaimID": "11175",
          "ProjectID": "10002",
          "CurrencyID": "SGD",
          "EmployeeID": "10010",
          "ExpenseDate": "2023-04-29T13:20:00+08:00",
          "Amount": "750.00",
          "Purpose": "Travel expenses for IT training",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T14:30:00+08:00"
        },
        {
          "ClaimID": "11176",
          "ProjectID": "10006",
          "CurrencyID": "CNY",
          "EmployeeID": "10018",
          "ExpenseDate": "2023-04-30T08:45:00+08:00",
          "Amount": "8000.00",
          "Purpose": "Cloud storage subscription",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T09:15:00+08:00"
        },
        {
          "ClaimID": "11177",
          "ProjectID": "10003",
          "CurrencyID": "HKD",
          "EmployeeID": "10015",
          "ExpenseDate": "2023-04-30T11:30:00+08:00",
          "Amount": "5500.00",
          "Purpose": "Hardware maintenance contract renewal",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T12:00:00+08:00"
        },
        {
          "ClaimID": "11178",
          "ProjectID": "10007",
          "CurrencyID": "KHR",
          "EmployeeID": "10011",
          "ExpenseDate": "2023-04-30T14:15:30+08:00",
          "Amount": "600000.00",
          "Purpose": "Server upgrade",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T14:45:00+08:00"
        },
        {
          "ClaimID": "11179",
          "ProjectID": "10004",
          "CurrencyID": "VND",
          "EmployeeID": "10020",
          "ExpenseDate": "2023-04-30T16:00:00+08:00",
          "Amount": "1800000.00",
          "Purpose": "Data analytics software license",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T16:00:00+08:00"
        },
        {
          "ClaimID": "11210",
          "ProjectID": "10007",
          "CurrencyID": "SGD",
          "EmployeeID": "10020",
          "ExpenseDate": "2023-04-27T09:30:00+08:00",
          "Amount": "15.50",
          "Purpose": "IT Equipment Purchase",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-28T10:15:00+08:00"
        },
        {
          "ClaimID": "11211",
          "ProjectID": "10005",
          "CurrencyID": "KRW",
          "EmployeeID": "10011",
          "ExpenseDate": "2023-04-28T14:20:00+08:00",
          "Amount": "200000.00",
          "Purpose": "Training Course Fees",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-28T16:35:00+08:00"
        },
        {
          "ClaimID": "11212",
          "ProjectID": "10003",
          "CurrencyID": "HKD",
          "EmployeeID": "10016",
          "ExpenseDate": "2023-04-29T08:45:00+08:00",
          "Amount": "2500.00",
          "Purpose": "Business Lunch Meeting",
          "ChargeToDefaultDept": "1",
          "AlternativeDeptCode": "103",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-29T12:20:00+08:00"
        },
        {
          "ClaimID": "11213",
          "ProjectID": "10004",
          "CurrencyID": "CNY",
          "EmployeeID": "10012",
          "ExpenseDate": "2023-04-29T15:00:00+08:00",
          "Amount": "500.00",
          "Purpose": "Stationery and Supplies",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Rejected",
          "LastEditedClaimDate": "2023-04-30T09:45:00+08:00"
        },
        {
          "ClaimID": "11214",
          "ProjectID": "10010",
          "CurrencyID": "IDR",
          "EmployeeID": "10014",
          "ExpenseDate": "2023-04-29T10:00:00+08:00",
          "Amount": "75000.00",
          "Purpose": "Marketing Materials",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-30T11:30:00+08:00"
        },
        {
          "ClaimID": "11215",
          "ProjectID": "10002",
          "CurrencyID": "INR",
          "EmployeeID": "10020",
          "ExpenseDate": "2023-04-30T13:45:00+08:00",
          "Amount": "8000.00",
          "Purpose": "Team Building Event",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-30T16:20:00+08:00"
        },
        {
          "ClaimID": "11216",
          "ProjectID": "10005",
          "CurrencyID": "SGD",
          "EmployeeID": "10011",
          "ExpenseDate": "2023-04-29T08:30:00+08:00",
          "Amount": "56.72",
          "Purpose": "Banking Operations Training",
          "ChargeToDefaultDept": "1",
          "AlternativeDeptCode": "105",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-29T14:30:00+08:00"
        },
        {
          "ClaimID": "11217",
          "ProjectID": "10008",
          "CurrencyID": "JPY",
          "EmployeeID": "10012",
          "ExpenseDate": "2023-04-28T10:45:00+08:00",
          "Amount": "3480.00",
          "Purpose": "IT Infrastructure Upgrade",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-29T09:20:00+08:00"
        },
        {
          "ClaimID": "11218",
          "ProjectID": "10001",
          "CurrencyID": "IDR",
          "EmployeeID": "10013",
          "ExpenseDate": "2023-04-26T15:15:00+08:00",
          "Amount": "900000.00",
          "Purpose": "Marketing Campaign Expenses",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Rejected",
          "LastEditedClaimDate": "2023-04-27T11:30:00+08:00"
        },
        {
          "ClaimID": "11219",
          "ProjectID": "10003",
          "CurrencyID": "HKD",
          "EmployeeID": "10014",
          "ExpenseDate": "2023-04-24T12:30:00+08:00",
          "Amount": "1200.50",
          "Purpose": "Office Supplies Purchase",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-26T16:45:00+08:00"
        },
        {
          "ClaimID": "11220",
          "ProjectID": "10006",
          "CurrencyID": "KHR",
          "EmployeeID": "10015",
          "ExpenseDate": "2023-04-23T11:00:00+08:00",
          "Amount": "150000.00",
          "Purpose": "Client Meeting Expenses",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-25T14:15:00+08:00"
        },
        {
          "ClaimID": "11221",
          "ProjectID": "10007",
          "CurrencyID": "INR",
          "EmployeeID": "10016",
          "ExpenseDate": "2023-04-22T14:45:00+08:00",
          "Amount": "3000.00",
          "Purpose": "Travel Expenses",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-24T16:30:00+08:00"
        },
        {
          "ClaimID": "11222",
          "ProjectID": "10008",
          "CurrencyID": "VND",
          "EmployeeID": "10014",
          "ExpenseDate": "2023-04-22T13:30:00+08:00",
          "Amount": "450000.00",
          "Purpose": "Banking equipment repair",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "103",
          "Status": "Rejected",
          "LastEditedClaimDate": "2023-04-23T14:00:00+08:00"
        },
        {
          "ClaimID": "11223",
          "ProjectID": "10006",
          "CurrencyID": "HKD",
          "EmployeeID": "10019",
          "ExpenseDate": "2023-04-27T09:00:00+08:00",
          "Amount": "800.00",
          "Purpose": "Banking operations training course",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-27T16:30:00+08:00"
        },
        {
          "ClaimID": "11224",
          "ProjectID": "10005",
          "CurrencyID": "CNY",
          "EmployeeID": "10017",
          "ExpenseDate": "2023-04-25T15:00:00+08:00",
          "Amount": "600.00",
          "Purpose": "Banking software maintenance",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-26T10:15:00+08:00"
        },
        {
          "ClaimID": "12230",
          "ProjectID": "10004",
          "CurrencyID": "SGD",
          "EmployeeID": "10013",
          "ExpenseDate": "2023-04-29T08:00:00+08:00",
          "Amount": "250.00",
          "Purpose": "Banking Operations",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-29T12:30:00+08:00"
        },
        {
          "ClaimID": "11225",
          "ProjectID": "10007",
          "CurrencyID": "IDR",
          "EmployeeID": "10016",
          "ExpenseDate": "2023-04-28T14:30:00+08:00",
          "Amount": "300.00",
          "Purpose": "Banking Tech",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-28T18:45:00+08:00"
        },
        {
          "ClaimID": "11226",
          "ProjectID": "10003",
          "CurrencyID": "JPY",
          "EmployeeID": "10018",
          "ExpenseDate": "2023-04-27T10:00:00+08:00",
          "Amount": "1500.00",
          "Purpose": "Operations",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Approved",
          "LastEditedClaimDate": "2023-04-27T14:15:00+08:00"
        },
        {
          "ClaimID": "11227",
          "ProjectID": "10010",
          "CurrencyID": "KRW",
          "EmployeeID": "10012",
          "ExpenseDate": "2023-04-26T13:00:00+08:00",
          "Amount": "800.00",
          "Purpose": "Banking Operations",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Rejected",
          "LastEditedClaimDate": "2023-04-26T17:30:00+08:00"
        },
        {
          "ClaimID": "11228",
          "ProjectID": "10002",
          "CurrencyID": "SGD",
          "EmployeeID": "10011",
          "ExpenseDate": "2023-04-25T09:30:00+08:00",
          "Amount": "75.00",
          "Purpose": "Banking Tech",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-25T13:45:00+08:00"
        },
        {
          "ClaimID": "11229",
          "ProjectID": "10005",
          "CurrencyID": "INR",
          "EmployeeID": "10017",
          "ExpenseDate": "2023-04-24T16:00:00+08:00",
          "Amount": "900.00",
          "Purpose": "Banking Operations",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-24T20:15:00+08:00"
        },
        {
          "ClaimID": "11231",
          "ProjectID": "10005",
          "CurrencyID": "INR",
          "EmployeeID": "10017",
          "ExpenseDate": "2023-04-24T17:00:00+08:00",
          "Amount": "100.00",
          "Purpose": "Banking Operations",
          "ChargeToDefaultDept": "0",
          "AlternativeDeptCode": "",
          "Status": "Pending",
          "LastEditedClaimDate": "2023-04-24T20:17:00+08:00"
        }
      ]

x = mycol.insert_many(mylist)

# print list of the _id values of the inserted documents:
print(x.inserted_ids)

#====================================================================
# check inserted result
# myresult = mycol.find().limit(10)

# print the result
# for x in myresult:
#   print(x)

#========================================================================
#Filter Result/where condition
#method 1 - basic where condition
# myquery = { "ProjectID": 10001 }
# mydoc = employeeprojects.find(myquery)
# for x in mydoc:
#   print(x)


#====================================================================
#clear data
# x = mycol.delete_many({})
# print(x.deleted_count, " documents deleted.")

