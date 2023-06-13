import ComplaintForm from '@components/complaint/ComplaintForm';
import React, { Suspense } from 'react';
import Loading from './loading';

const page = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ComplaintForm />
      </Suspense>
    </div>
  );
};

export default page;
