from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy, Model

app = Flask(__name__)
api = Api(app)

#test9.1
#create tmp database =============================================================================
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class VideoModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    views = db.Column(db.Integer, nullable=False)
    likes = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Video(name = {name}, views = {views}, likes = {likes})"
    
# db.create_all() #only create once


#================================================================================================

# names = {"tim": {"age": 19, "gender":"male"},
#         "bill":{"age":70,"gender":"male"}}

# class HelloWorld(Resource): 
    #test1.1
    # def get(self):
    #     return {"data": "Hello World"}

    #test2.1
    # def post(self):
    #     return {"data": "Posted"}
    
    #test3.1
    # def get(self, name, test):
    #     return {"name": name, "test":test}

    #test4.1
    # def get(self, name):
    #     return names[name]
    
#test1.2, test2.2
# api.add_resource(HelloWorld, "/helloworld")

#test3.2
# api.add_resource(HelloWorld, "/helloworld/<string:name>/<int:test>")
 
#test4.2
# api.add_resource(HelloWorld, "/helloworld/<string:name>")

#================================================================================================

# video_put_args = reqparse.RequestParser()

#test5.1
#param optional it will return as none if not provided
# video_put_args.add_argument("name", type=str, help="Name of the video is required")
# video_put_args.add_argument("views", type=int, help="Views of the video is required")
# video_put_args.add_argument("likes", type=int, help="Likes of the video is required")

#test6.1, test7.1, test8.1
#param required. return error message when not provided
# video_put_args.add_argument("name", type=str, help="Name of the video is required", required=True)
# video_put_args.add_argument("views", type=int, help="Views of the video is required", required=True)
# video_put_args.add_argument("likes", type=int, help="Likes of the video is required", required=True)

# videos = {}

# def abort_if_video_id_doesnt_exist(video_id):
#     if video_id not in videos:
#         abort(404, message="Could not find video...")

# def abort_if_video_exists(video_id):
#     if video_id in videos:
#         abort(409, message="Video already exists with that ID...")


# class Video(Resource):
#     def get(self, video_id):
#         abort_if_video_id_doesnt_exist(video_id)
#         return videos[video_id]
#         # return videos
    
    #test5.2
    # def put(self, video_id):
    #     args = video_put_args.parse_args()
    #     return{video_id: args}

    # #test6.2
    # def put(self, video_id):
    #     args = video_put_args.parse_args()
    #     return{video_id: args}
    
#     #test7.2, test 8.2
#     def put(self, video_id):
#         abort_if_video_exists(video_id)
#         args = video_put_args.parse_args()
#         videos[video_id] = args
#         return videos[video_id], 201
    
#     #test8.2
#     def delete(self, video_id):
#         abort_if_video_id_doesnt_exist(video_id)
#         del videos[video_id]
#         return '',204

# api.add_resource(Video, "/video/<int:video_id>")

#test9.2
#================================================================================================
video_put_args = reqparse.RequestParser()
video_put_args.add_argument("name", type=str, help="Name of the video is required", required=True)
video_put_args.add_argument("views", type=int, help="Views of the video is required", required=True)
video_put_args.add_argument("likes", type=int, help="Likes of the video is required", required=True)

video_update_args = reqparse.RequestParser()
video_update_args.add_argument("name", type=str, help="Name of the video is required")
video_update_args.add_argument("views", type=int, help="Views of the video is required")
video_update_args.add_argument("likes", type=int, help="Likes of the video is required")


resource_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'views': fields.Integer,
    'likes': fields.Integer
}

class Video(Resource):
    @marshal_with(resource_fields)
    def get(self, video_id):
        result = VideoModel.query.filter_by(id=video_id).first() #return only first record, .all() will return all
        if not result:
            abort(404, message='Could not find video with that id')
        return result
    
    @marshal_with(resource_fields)
    def put(self, video_id):
        result = VideoModel.query.filter_by(id=video_id).first()
        
        if result:
            abort(409, message="Video id taken...")

        args = video_put_args.parse_args()
        video = VideoModel(id=video_id, name=args['name'], views=args['views'], likes=args['likes'])
        db.session.add(video)
        db.session.commit()
        return video, 201
    
    @marshal_with(resource_fields)
    def patch(self, video_id):
        args = video_update_args.parse_args()
        result = VideoModel.query.filter_by(id=video_id).first()
        if not result:
            abort(404, message="Video doesn't exist, cannot update")
        
        if args['name']:
            result.name = args['name']
        if args['views']:
            result.views = args['views']
        if args['likes']:
            result.likes = args['likes']
        
        db.session.commit()

        return result

        


    
api.add_resource(Video, "/video/<int:video_id>")
    

if __name__ == "__main__":
    app.run(debug=True)

