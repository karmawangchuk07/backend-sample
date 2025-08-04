import { Eye, MessageCircle, Heart, User, X, Send } from "lucide-react"
import { useState } from "react"

const ReviewCard = () => {
  const [likes, setLikes] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      text: "These appetizers look amazing! Can't wait to try them.",
      time: "2 hours ago"
    },
    {
      id: 2, 
      author: "Sarah Smith",
      text: "Perfect for my dinner party this weekend. Thank you for sharing!",
      time: "1 hour ago"
    }
  ])
  const [newComment, setNewComment] = useState("")

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        text: newComment.trim(),
        time: "Just now"
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddComment()
    }
  }

  return (
    <>
      {/* <Navbar/> */}
      <div className="mt-10 max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative mt-10 rounded-xl">
          <img 
            src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=300&fit=crop" 
            alt="Appetizers for dinner party"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Author Info */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Admin</p>
              <div className="flex items-center text-xs text-gray-500">
                <span>Mar 21, 2023</span>
                <span className="mx-2">•</span>
                <span>1 min read</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-tight hover:text-green-600 cursor-pointer transition-colors duration-200">
            Appetizers for your dinner party
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading...
          </p>

          {/* Engagement Metrics */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              {/* Views */}
              <div className="flex items-center text-gray-500 text-sm">
                <Eye className="w-4 h-4 mr-1" />
                <span>0</span>
              </div>

              {/* Comments - Now Clickable */}
              <button 
                onClick={() => setShowComments(true)}
                className="flex items-center text-gray-500 text-sm hover:text-green-600 transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                <span>{comments.length}</span>
              </button>
            </div>

            {/* Likes */}
            <button 
              onClick={handleLike}
              className="flex items-center text-sm transition-colors duration-200 hover:scale-105"
            >
              <Heart 
                className={`w-4 h-4 mr-1 transition-colors duration-200 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'
                }`} 
              />
              <span className={isLiked ? 'text-red-500' : 'text-gray-500'}>{likes}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Comments ({comments.length})
              </h3>
              <button 
                onClick={() => setShowComments(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Comments List */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Comment Section */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Write a comment..."
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-green-500 transition-colors duration-200"
                    
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Send className="w-4 h-4" />
                      <span>Post Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewCard