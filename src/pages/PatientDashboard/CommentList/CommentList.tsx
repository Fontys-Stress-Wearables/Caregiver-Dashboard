import * as React from 'react'
import { useState } from 'react'
import { FeedbackProps } from '../../../utils/api/calls'
import MockComments from './MockComments.json'
import Comment from './Comment/Comment'
import CommentModal from '../../../components/Modals/CommentModal/CommentModal'
import List from '@mui/material/List'
import styles from './CommentList.module.scss'

const CommentList = () => {
  const [list] = useState(MockComments)
  const [showCommentEditModal, setShowCommentEditModal] = useState(false)
  const [commentForm, setCommentForm] = useState<FeedbackProps>({ id: '', comment: '', date: '' })

  const openCommentEditModal = (feedback: FeedbackProps) => {
    setCommentForm(feedback)
    setShowCommentEditModal(true)
  }

  return (
    <React.Fragment>
      <div className={styles.Container}>
        <div className={styles.CommentListContainer}>
          <List>
            {list.map((value) => (
              <Comment
                key={value.id}
                comment={value}
                openModal={() => openCommentEditModal(value)}
              />
            ))}
          </List>
        </div>
      </div>

      <CommentModal
        commentForm={commentForm}
        setCommentForm={setCommentForm}
        show={showCommentEditModal}
        hide={() => setShowCommentEditModal(false)}
      />
    </React.Fragment>
  )
}

export default CommentList
