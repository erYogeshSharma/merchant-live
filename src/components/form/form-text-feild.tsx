import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const TextFormFeild = ({
  control,
  name,
  label = "",
  type,
  placeholder = "",
}: {
  control: any;
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel> {label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} type={type} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default TextFormFeild;
// Path: src/components/form/form-textarea.tsx
