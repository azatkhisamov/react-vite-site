import { useParams } from 'react-router-dom'

import Posts from '../Posts/Posts'

function UserPage() {
  const { userId } = useParams();
  
  return (<>
    <Posts userId={userId} />
  </>
  )
}

export default UserPage