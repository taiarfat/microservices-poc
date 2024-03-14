const CommentList = ({comments}) => {

  const renderedComments = comments?.map(comment => {
    let content = '';
    if (comment.status === 'approved') {
      content = comment.content
    }
    if (comment.status === 'rejected') {
      content = 'This comment was rejected'
    }
    if (comment.status === 'pending') {
      content = 'This comment is awaiting moderation'
    }

    return <div className="rounded-lg border p-2 min-w-24" key={comment.id}>
     <div className="text-md">
      {content}
     </div> 
    </div>
  })
  return (
    <div className="flex gap-6 mt4 flex-col justify-start flex-wrap">{renderedComments}</div>
  )
}

export default CommentList