type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => (
  <main className="min-h-screen w-full bg-gray-950 flex items-center justify-center">
    {children}
  </main>
);
export default MainLayout;
