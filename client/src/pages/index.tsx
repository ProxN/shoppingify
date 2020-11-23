import { NextPage } from 'next';
import Link from 'next/link';

interface Props {}

const Index: NextPage<Props> = () => {
  return (
    <div>
      <h1>Hello world</h1>
      <Link href='/login'>
        <span>go to login</span>
      </Link>
    </div>
  );
};

export default Index;
