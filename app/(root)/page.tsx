
import { UserButton } from '@clerk/nextjs'

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <UserButton afterSignoutUrl ='/' />
    </div>
  );
}

export default Home;
