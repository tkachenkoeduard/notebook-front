import {GetServerSideProps, NextPage} from "next";

const NotesIndexPage: NextPage = (props, context) => {
  return <>
    <h1>index page</h1>
  </>
}

export const getServerSideProps: GetServerSideProps = (context) => {
  console.log(context.req)
  return {
    props: {}
  }
}
export default NotesIndexPage