import { Heading, List, ListItem, HStack, Button } from "@chakra-ui/react";

import useForms, { IForm } from "../hooks/useForms";
import { useEffect } from "react";
import { isActive } from "../services/forms";

interface Props {
  onSelectForm: (form: IForm) => void;
  selectedForm: IForm | null;
}

const FormsList = ({ onSelectForm, selectedForm }: Props) => {
  const { forms, error, isLoading, firstActive } = useForms();

  useEffect(() => {
    if (firstActive && !selectedForm) onSelectForm(firstActive);
  }, [firstActive]);

  return (
    <>
      <Heading marginBottom={3} fontSize="2xl">
        Forms
      </Heading>

      <List>
        {forms.map((form) => (
          <ListItem key={form.Name}>
            <HStack>
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={
                  form.Name === selectedForm?.Name ? "bold" : "normal"
                }
                color={isActive(form) ? "green.300" : "orange.300"}
                onClick={() => onSelectForm(form)}
                fontSize="lg"
                variant="link"
              >
                {form.Name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default FormsList;
