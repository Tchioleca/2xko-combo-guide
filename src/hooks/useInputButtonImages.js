// Hook to store input button data and images
// Image URLs ( susbtitute for "null") with links from claudinary)

const buttonData = [
  {
    button: "LP",
    description: "Light-Punch",
    image: null // Will be filled in
  },
  {
    button: "MP",
    description: "Medium-Punch",
    image: null
  },
  {
    button: "HP",
    description: "Heavy-Punch",
    image: null
  },
  {
    button: "S1",
    description: "Special-Move-1",
    image: null
  },
  {
    button: "S2",
    description: "Special-Move-2",
    image: null
  },
  {
    button: "S1S",
    description: "Super-Move-1",
    image: null
  },
  {
    button: "S2S",
    description: "Super-Move-2",
    image: null
  },
  {
    button: "S1S2",
    description: "Ultimate-Move",
    image: null
  },
  {
    button: "5",
    description: "Neutral-Input",
    image: null
  },
  {
    button: "2",
    description: "Down",
    image: null
  },
  {
    button: "6",
    description: "Forward",
    image: null
  },
  {
    button: "4",
    description: "Back",
    image: null
  },
  {
    button: "8",
    description: "Up",
    image: null
  },
  {
    button: "3",
    description: "Down-Forward",
    image: null
  },
  {
    button: "1",
    description: "Down-Back",
    image: null
  },
  {
    button: "9",
    description: "Up-Forward",
    image: null
  },
  {
    button: "7",
    description: "Up-Back",
    image: null
  },
  {
    button: "T",
    description: "Tag",
    image: null
  }
]

// Create a map for quick lookup
const buttonMap = buttonData.reduce((acc, btn) => {
  acc[btn.button] = btn
  return acc
}, {})

export default function useInputButtonImages() {
  const getButtonData = (buttonName) => {
    return buttonMap[buttonName] || { button: buttonName, description: buttonName, image: null }
  }

  const getAllButtonData = () => buttonData

  return { getButtonData, getAllButtonData, buttonMap }
}
// need to display also the imputs for the actions ( pop push etc...)