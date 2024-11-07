
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {DropDownInputType, Element as ElementType, RadioInputType, RangeInputType, SelectInputType, TextFieldInputType, TextInputType} from "./surveySetup"
import { Button } from "../ui/button"
import { useSurvey } from "./useSurvey"

type ElementsProps = {
    elements: ElementType[];
    indent?: boolean;
    indexOffset?: number;
  }
  
export function Elements({elements, indent, indexOffset = 1}: ElementsProps) {
    return <div className={`space-y-12 ${indent && "pl-4 border-l border-l-primary dark:border-l-gray-500 my-6"}`}>
      {elements.map((e, i) => <Element key={String(i)} element={e} index={i + indexOffset} />)}
    </div>
  }
  
  function Element({element, index}: {element: ElementType, index: number}) {
    const {errors, answers} = useSurvey();
    if(element.type === "Text") return <div className="space-y-2">
        <p className="text-lg">{element.title}</p> 
        {element.subtitle && <p className="leading-7 text-muted-foreground">{element.subtitle}</p>}
    </div>

    if(element.type === "Compound") return element.elements && <Elements elements={element.elements} indent indexOffset={index*2} />;

    const hasAnswer = 0 < (answers.get(element.id)?.length ?? 0);
    const error = errors.get(element.id);

    return <div className={`duration-200 space-y-2 relative -mx-6 px-6 ${hasAnswer ? "text-primary" : ""} ${error ? "bg-red-200 dark:bg-red-950" : ""}`}>

        <Label>{index}: {element.title}</Label> {element.required && <span className="text-red-500">*</span>}
      
      {element.type === "TextInput" && <TextInput {...element} />}
      {element.type === "RadioInput" && <RadioInput {...element} />}
      {element.type === "TextFieldInput" && <TextFieldInput {...element} />}
      {element.type === "SelectInput" && <SelectInput {...element} />}
      {element.type === "DropDownInput" && <DropDownInput {...element} />}
      {element.type === "RangeInput" && <RangeInput {...element} />}
      
      {element.subtitle && <p className="text-[0.8rem] text-muted-foreground">{element.subtitle}</p>}
    </div>
  }
  
  function TextInput(element: TextInputType) {
    const {answers, answer} = useSurvey()
    const currentAnswer = answers.get(element.id);

    return <Input className="text-foreground" id={element.title} name={element.title} value={currentAnswer} onChange={e => answer(element.id, e.target.value)} placeholder="Your name" />
  }
  
  function RadioInput(element: RadioInputType) {
    const {answers, answer} = useSurvey()
    const currentAnswer = answers.get(element.id);

    return <RadioGroup name={element.title} value={currentAnswer} onValueChange={(value) => answer(element.id, value)}>
      {element.options?.map(option => 
        <div key={option} className={`flex rounded-sm items-center space-x-2 space-y-1`}>
          <RadioGroupItem value={option} id={option} />
          <Label htmlFor={option}>{option}</Label>
        </div>
      )}
    </RadioGroup>
  }
  
  function SelectInput(element: SelectInputType) {
    const {answers, answer} = useSurvey()
    const currentAnswer = answers.get(element.id)?.split('|')

    function onInputChange(option: string, checked: boolean | string) {
        checked = checked === true || checked === "true";

        if(!checked) {
            if (!currentAnswer) return;
            
            answer(element.id, currentAnswer.filter(o => option !== o).join('|'));
            return;
        }

        const newAnswer = [...(currentAnswer || []), option];
        answer(element.id, newAnswer.join('|'));

    }

    return <div className="space-y-2">
        {element.options?.map((option) => (
          <div key={option} className="flex items-center space-x-2 space-y-1">
            <Checkbox
              name={option}
              id={option} 
              checked={currentAnswer?.includes(option)}
              onCheckedChange={e => onInputChange(option, e)}
            />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </div>
  }
  
  function DropDownInput(element: DropDownInputType) {
    const {answers, answer} = useSurvey()
    const currentAnswer = answers.get(element.id);

    return (
      <Select name={element.title} value={currentAnswer} onValueChange={value => answer(element.id, value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {element.options?.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
  
  function RangeInput(element: RangeInputType) {
    const {answers, answer} = useSurvey()
    const currentAnswer = answers.get(element.id);

    function onClick(option: string) {
        if(currentAnswer === option) answer(element.id, null);
        else answer(element.id, option);
    }
  
    return <div className="w-full flex gap-2">
      {element.options?.map(option =>
        <Button key={option} className="w-full" onClick={() => onClick(option)} 
          variant={option === currentAnswer ? "default" : "secondary"}
          size="icon">
            {option}
        </Button>
      )}
    </div>
  }
  
  function TextFieldInput(element: TextFieldInputType) {
    const {answers, answer} = useSurvey()
    const currentAnswer = answers.get(element.id);

    return <Textarea
        className="text-foreground"
        id={element.title}
        name={element.title} value={currentAnswer}
        onChange={(e) => answer(element.id, e.target.value)}
        placeholder={element.placeholder}
    />
  }