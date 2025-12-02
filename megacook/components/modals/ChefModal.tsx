import SelectionModal from "../ui/popup/FoodPopup";
import { ChefType } from "../../data/chefsData";

interface ChefModalProps {
  visible: boolean;
  items: Array<{
    key: string;
    name: string;
    image: string;
    description: string;
    price: number;
    nutritional: any;
  }>;
  selectedKey: ChefType | null;
  onSelect: (key: string) => void;
  onValidate: () => void;
}

export const ChefModal = ({ visible, items, selectedKey, onSelect, onValidate }: ChefModalProps) => {
  return (
    <SelectionModal
      visible={visible}
      title="Choisis ton chef !"
      items={items}
      selectedKey={selectedKey}
      onSelect={onSelect}
      onValidate={onValidate}
    />
  );
};
