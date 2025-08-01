import RootLayout from "./Layout/RootLayout/RootLayout";
import RootRoute from "./Routes/RootRoute";

function App(props) {
    return (
        <RootLayout>
            <RootRoute />
        </RootLayout>
    );
}

export default App;