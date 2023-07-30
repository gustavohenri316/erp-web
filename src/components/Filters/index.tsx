import { useState, useEffect, useRef } from "react";
import { Button } from "../Button";
import { FilterItem } from "./FilterItem";
import { CaretDown, CaretUp } from "phosphor-react";

export function Filter(props: FilterProps) {
  const {
    array,
    value,
    listLabel,
    handleValue,
    label,
    isDefault = true,
    defaultLabel = "Todos",
    isSelected = false,
    selectedDefault,
    variant = "outline-secondary",
  } = props;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | number | undefined>(
    selectedDefault
  );
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleOpen() {
    setOpen(!open);
  }

  const arrayList =
    array &&
    array?.map((item) => {
      return {
        label: listLabel ? item[listLabel] : undefined,
        value: value ? item[value] : undefined,
      };
    });

  return (
    <>
      <div className="relative " ref={filterRef}>
        <Button onClick={handleOpen} variant={variant}>
          <div className="flex justify-between px-2 items-center">
            <span className="mr-2 flex justify-center items-center">
              {isSelected ? (selected ? selected : label) : defaultLabel}
            </span>
            <span>
              {!open ? (
                <CaretDown size={16} weight="bold" />
              ) : (
                <CaretUp size={16} weight="bold" />
              )}
            </span>
          </div>
        </Button>

        {open && (
          <div className="flex flex-col border border-gray-300 bg-white mt-2 rounded-md absolute right-0  z-50 ">
            {isDefault && (
              <FilterItem onClick={() => handleValue && handleValue("")}>
                Todos
              </FilterItem>
            )}

            {arrayList &&
              arrayList.map((item) => {
                const isSelectedItem = item.value === isSelected;
                return (
                  <FilterItem
                    key={item.value}
                    onClick={() => {
                      setSelected(item.label);
                      handleValue
                        ? handleValue(item.value as string)
                        : undefined;
                    }}
                  >
                    <span className={isSelectedItem ? "font-bold" : ""}>
                      {item.label}
                    </span>
                  </FilterItem>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}
