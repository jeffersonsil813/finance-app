import UserForm from "./user-form";

const PageContent = () => {
  return (
    <main className="flex flex-col space-y-5 w-full max-w-120">
      <h1 className="text-[20px] font-semibold">Profile</h1>

      <UserForm />
    </main>
  );
};

export default PageContent;
