import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { FormRow } from "../../pages/setting/components/FormGridComponents";

type IProps = {
    group?: string,
    label: string,
    options: Map<string, string>,
    value?: string| Array<string>,
    onChange: Function,
}

function ToggleGroupBlock({group, label, options, value, onChange}: IProps) {
    return (
      <FormRow key={group} label={label}>
        <ToggleButtonGroup
          size="small"
          sx={{
            float: "right",
          }}
          value={value}
          onChange={(event, value) => {
            onChange(value);
          }}
        >
          {Array.from(options.entries()).map((opt, index) => (
            <ToggleButton key={`tb-${group}-${index}`} value={opt[0]}>{opt[1]}</ToggleButton>
          ))}
          {/* <ToggleButton value="r">全年齢</ToggleButton>
          <ToggleButton value="r15">R15</ToggleButton>
          <ToggleButton value="r18">R18</ToggleButton> */}
        </ToggleButtonGroup>
      </FormRow>
    );
}

export default ToggleGroupBlock;