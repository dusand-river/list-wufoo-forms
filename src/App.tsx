import { useState } from "react";
import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import FormsList from "./components/FormsList";
import { Form } from "./hooks/useForms";
import FormEntries from "./components/FormEntries";

function App() {
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "nav main"`,
      }}
      gridTemplateColumns={"300px 2fr"}
    >
      <GridItem pl="2" area={"header"}>
        <Header />
      </GridItem>
      <GridItem pl="2" area={"nav"}>
        <FormsList
          selectedForm={selectedForm}
          onSelectForm={(form) => setSelectedForm(form)}
        />
      </GridItem>
      <GridItem pl="2" area={"main"}>
        {selectedForm && <FormEntries form={selectedForm} />}
      </GridItem>
    </Grid>
  );
}

export default App;
