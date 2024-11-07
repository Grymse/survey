
import DarkmodeButton from "./components/admin/buttons/DarkmodeButton";
import Providers from "./Providers";
import Survey from "./components/survey/Survey";

function App() {
  return (
    <Providers>
      <div className="absolute bottom-4 right-4">
        <DarkmodeButton />
      </div>
      <main className="w-screen h-screen overflow-y-scroll">
        <Survey />
      </main>
    </Providers>
  );
}

export default App;
