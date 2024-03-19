import Header from '@/components/Shared/Header'
import TransformationForm from '@/components/Shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
    return null; 
  }

  const user = await getUserById(userId);

  if (!user) {
    
    redirect('/sign-in');
    return null;
  }
  
  const transformation = transformationTypes[type];

  return (
    <>
      <Header 
        title={transformation.title}
        subTitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
         creditBalance={userId.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage
