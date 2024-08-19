import FloatingShape from "./FloatingShape"


const FloatingComponent = () => {
  return (
    <div>
     
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-amber-500"
        size="w-48 h-48"
        top="40%"
        left="70%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="0%"
        delay={2}
      />
    </div>
  )
}

export default FloatingComponent
