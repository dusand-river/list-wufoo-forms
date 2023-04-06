import { Heading, List, ListItem, Text } from "@chakra-ui/react";
import useFormFields, { FormFields } from "../hooks/useFormFields";
import { Form } from "../hooks/useForms";

interface IFormFieldListProps {
  selectedForm: Form;
}

const FormFieldsList: React.FC<IFormFieldListProps> = ({ selectedForm }) => {
  // const { selectedForm } = props;
  const { fields, error, isLoading } = useFormFields(selectedForm);

  if (error) return <Text>{error}</Text>;
  return (
    <>
      <Heading marginBottom={3} fontSize="4xl">
        Field List
      </Heading>
      <List>
        {fields.map((field) => (
          <ListItem key={field.ID}>
            <Text textAlign="left">
              {field.Title.slice(0, 30) + ", " + field.ID}
            </Text>
          </ListItem>
        ))}
      </List>
      ;
    </>
  );
};

export default FormFieldsList;
