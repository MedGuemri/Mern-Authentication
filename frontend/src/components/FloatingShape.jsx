import {motion} from "framer-motion"

const FloatingShape = ({color,size,top,left,delay}) => {
  return (
    <motion.div className={`${color} ${size} absolute rounded-full blur-xl opacity-20  `}
style={{top,left}}
    animate={{
        x:["0%", "100%", "0%"],
        y:["0%", "100%", "0%"],
        rotate:[0,360]
    }}
    transition={{
        duration:15,
        ease:"linear",
        repeat:Infinity,
        delay,
    }}
   aria-hidden='true'
    
    />

      
    
  )
}

export default FloatingShape
