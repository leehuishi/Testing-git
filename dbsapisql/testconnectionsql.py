import mysql.connector

mydb = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password = 'Mysql@12345678',
    database = 'mydatabase'
)

#==========================================================================================================
#create database
# mycursor = mydb.cursor()
# mycursor.execute("CREATE DATABASE mydatabase")

#==========================================================================================================
#check all database
# mycursor = mydb.cursor()
# mycursor.execute("SHOW DATABASES")
# for x in mycursor:
#   print(x)

#==========================================================================================================
#create table 
# mycursor = mydb.cursor()
# mycursor.execute("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))")

#==========================================================================================================
#check all table under mydatabase
# mycursor = mydb.cursor()
# mycursor.execute("SHOW TABLES")
# for x in mycursor:
#   print(x)

#==========================================================================================================
#create table with primary key
# mycursor = mydb.cursor()
# mycursor.execute("CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))")

#==========================================================================================================
#alter table with primary key
# mycursor = mydb.cursor()
# mycursor.execute("ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY")


#****************************
# Insert query
#****************************

#==========================================================================================================
#insert query
# mycursor = mydb.cursor()
# sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
# val = ("John", "Highway 21")
# mycursor.execute(sql, val)
# mydb.commit()
# print(mycursor.rowcount, "record inserted.")

#==========================================================================================================
#insert multiple records
# mycursor = mydb.cursor()
# sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
# val = [
#   ('Peter', 'Lowstreet 4'),
#   ('Amy', 'Apple st 652'),
#   ('Hannah', 'Mountain 21'),
#   ('Michael', 'Valley 345'),
#   ('Sandy', 'Ocean blvd 2'),
#   ('Betty', 'Green Grass 1'),
#   ('Richard', 'Sky st 331'),
#   ('Susan', 'One way 98'),
#   ('Vicky', 'Yellow Garden 2'),
#   ('Ben', 'Park Lane 38'),
#   ('William', 'Central st 954'),
#   ('Chuck', 'Main Road 989'),
#   ('Viola', 'Sideway 1633')
# ]

# mycursor.executemany(sql, val)
# mydb.commit()
# print(mycursor.rowcount, "was inserted.")

#==========================================================================================================
#return id of the last inserted row
# mycursor = mydb.cursor()

# sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
# val = ("Michelle", "Blue Village")
# mycursor.execute(sql, val)

# mydb.commit()

# print(mycursor.rowcount, " record inserted, ID:", mycursor.lastrowid)


#****************************
# Select query
#****************************

#==========================================================================================================
#Basic select
# mycursor = mydb.cursor()
# mycursor.execute("SELECT * FROM customers")
# myresult = mycursor.fetchall()

# print(myresult) #return array

# for x in myresult:
#   print(x)

#==========================================================================================================
#Select certain column
mycursor = mydb.cursor()
mycursor.execute("SELECT name, address FROM customers")
myresult = mycursor.fetchall()
for x in myresult:
  print(x)

#==========================================================================================================
#Only return first row of the result
# mycursor = mydb.cursor()
# mycursor.execute("SELECT * FROM customers")
# myresult = mycursor.fetchone()
# print(myresult)

#==========================================================================================================
#with filter (where statement)
# mycursor = mydb.cursor()
# sql = "SELECT * FROM customers WHERE address ='Park Lane 38'"
# mycursor.execute(sql)
# myresult = mycursor.fetchall()
# for x in myresult:
#   print(x)

#==========================================================================================================
#with filter (where statement)
#like '%%' --- % wildcard
# mycursor = mydb.cursor()
# sql = "SELECT * FROM customers WHERE address LIKE '%way%'"
# mycursor.execute(sql)
# myresult = mycursor.fetchall()
# for x in myresult:
#   print(x)

#==========================================================================================================
#prevent sql injection
#use escape query values 
#placeholder %s
# mycursor = mydb.cursor()
# sql = "SELECT * FROM customers WHERE address = %s"
# adr = ("Yellow Garden 2", )
# mycursor.execute(sql, adr)
# myresult = mycursor.fetchall()
# for x in myresult:
#   print(x)

#****************************
# Prevent sql injection
#****************************
#placeholder %s

#single placeholder
# mycursor = mydb.cursor()
# sql = "SELECT * FROM customers WHERE address = %s"
# adr = ("Yellow Garden 2", )
# mycursor.execute(sql, adr)
# myresult = mycursor.fetchall()
# for x in myresult:
#   print(x)

#multiple placeholder
# mycursor = mydb.cursor()
# sql = "UPDATE customers SET address = %s WHERE address = %s"
# val = ("Valley 345", "Canyon 123")
# mycursor.execute(sql, val)
# mydb.commit()
# print(mycursor.rowcount, "record(s) affected")

#****************************
# Limits
#****************************
#limit records return
# mycursor = mydb.cursor()
# mycursor.execute("SELECT * FROM customers LIMIT 5")
# myresult = mycursor.fetchall()
# for x in myresult:
#   print(x)

#offset
#e.g. start from position 3 and return 5 records
# mycursor = mydb.cursor()
# mycursor.execute("SELECT * FROM customers LIMIT 5 OFFSET 2")
# myresult = mycursor.fetchall()
# for x in myresult:
#   print(x)


#****************************
# Delete/Drop table 
#****************************
# mycursor = mydb.cursor()
# sql = "DROP TABLE customers"
# mycursor.execute(sql)

#==========================================================================================================
#Drop only if exist
#if not have error
# mycursor = mydb.cursor()
# sql = "DROP TABLE IF EXISTS customers"
# mycursor.execute(sql)


