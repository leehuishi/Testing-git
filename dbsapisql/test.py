import requests

BASE = "http://127.0.0.1:5000/"

#================================================================================================

#test1.3
# response = requests.get(BASE + "helloworld")
# print(response.json())

#test2.3
# response = requests.post(BASE + "helloworld")
# print(response.json())

#test3.3
# response = requests.get (BASE + "helloworld/tim/19")
# print(response.json())

#test4.3
# response = requests.get (BASE + "helloworld/bill")
# print(response.json())

#================================================================================================

#test5.3 
#expected outcome: {'1': {'name': None, 'views': None, 'likes': 10}}
# response = requests.put(BASE + "video/1", {"likes":10})
# print(response.json())

#test6.3 
#expected outcome: {'message': {'name': 'Name of the video is required'}}
# response = requests.put(BASE + "video/1", {"likes":10})
# print(response.json())

#test7.3 
# response = requests.put(BASE + "video/1", {"likes":10, "name":"Tim", "views":100000})
# print(response.json())
# input()
# response = requests.get(BASE + "video/6")
# print(response.json())

#test8.3
# data = [{"likes":78, "name":"Joe", "views":100000},
#         {"likes":10000, "name":"How to make REST API", "views":800000},
#         {"likes":35, "name":"Tim", "views":2000}]

# for i in range(len(data)):
#     response = requests.put(BASE + "video/" + str(i), data[i])
#     print(response.json())

# input()
# response = requests.delete(BASE + "video/0")
# print(response)
# input()
# response = requests.get(BASE + "video/2")
# print(response.json())

#================================================================================================

#test9.3
# data = [{"likes":78, "name":"Joe", "views":100000},
#         {"likes":10000, "name":"How to make REST API", "views":800000},
#         {"likes":35, "name":"Tim", "views":2000}]

# for i in range(len(data)):
#     response = requests.put(BASE + "video/" + str(i), data[i])
#     print(response.json())

# input()
# response = requests.get(BASE + "video/6")
# print(response.json())


#test9.4
# response = requests.patch(BASE + "video/2", {"views":99, "likes":101})
# print(response.json())



#test9.5
response = requests.patch(BASE + "video/2", {})
print(response.json())