import './style.css'

interface TabsNavigationProps {
  items: string[]
  selectedItem: string
  onChangeItem: (item: string) => void
}

export function TabsNavigation({ items, selectedItem, onChangeItem }: TabsNavigationProps) {
  return (
    <div className="tabs-navigation">
      {items.map(item => (
        <div
          key={item}
          className={`tab-navigate ${selectedItem === item && 'tab-navigate--selected'}`}
          onClick={() => onChangeItem(item)}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
