
import { getProviders,signIn } from 'next-auth/react'


function Login({providers}) {
 
   return (
    <div className='loginDiv'>
      <img className='sdLogo' src='https://i.imgur.com/Uhdeb6V.png' alt=""/>
      {
        Object.values(providers).map((provider)=>(
         <div key={provider.id}>
           <button className='button-27' onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
             Login with {provider.name}
           </button>
           </div>
        ))
      }
     
    </div>
  )
}

export default Login;



export async function getServerSideProps() {
  const providers = await getProviders();
  console.log("Providers", providers)
  return {
    props: { providers },
  };
}