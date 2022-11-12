import {NextPage} from "next";
import {useRouter} from "next/router";

const NotePage: NextPage = (props, context) => {
  console.log('props', props)
  const router = useRouter()
  const { id } = router.query

  return <>
    <h3>note {id}</h3>
  </>
}

export default NotePage