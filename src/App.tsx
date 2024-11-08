import DarkmodeButton from "./components/utils/DarkmodeButton";
import Providers from "./Providers";
import Survey from "./components/survey/Survey";
import LoginModal from "./components/login/LoginModal";

function App() {
  return (
    <Providers>
      <LoginModal />
      <div className="absolute bottom-4 right-4">
        <DarkmodeButton />
      </div>
      <main className="w-[100dvw] h-[100dvh] overflow-y-scroll">
        <Survey />
      </main>
    </Providers>
  );
}

export default App;
