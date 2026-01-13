import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableItemProps } from "../../../types/dnd";

export const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="hover:cursor-grab active:cursor-grabbing active:opacity-60
        active:border-dotted active:border-2 active:border-blue-600"
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};
