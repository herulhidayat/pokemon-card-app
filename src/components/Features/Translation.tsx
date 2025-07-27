import { Container } from "@mui/material";
import SelectStatic from "../Form/SelectStatic";
import GlobeIcon from "../Icons/GlobeIcon";
import DropDownIcon from "../Icons/DropDownIcon";

export default function Translation() {
    const languages = [
        { key: 'English', value: 'en' },
        { key: 'Indonesia', value: 'id' },
    ]
    return (
        <>
            <div className="w-full bg-gray-200 h-[2.133rem] flex items-center">
                <Container>
                    <div className="flex justify-end">
                        <SelectStatic
                            placeholder="Select Language"
                            deafultValue={languages[0].value}
                            configData={languages}
                            callbackSelected={(value) => console.log(value)}
                            style={{
                                '& .MuiSelect-select': {
                                    paddingTop: '0px',
                                    paddingRight: '40px !important',
                                    paddingBottom: '0px',
                                    border: 'none',
                                    color: 'var(--color-gray-500)'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                }
                            }}
                            iconDropDown={DropDownIcon}
                            customPlaceholderIcon={
                                <div className="text-gray-400 flex items-center">
                                    <GlobeIcon />
                                </div>
                            }
                        />
                    </div>
                </Container>
            </div>
        </>
    );
}