export interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export interface DndGridWrapperProps<T> {
  items: T[];
  onReorder: (newOrder: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
  getId?: (item: T) => string; // defaults to item.id
  gridClass: string;
}
