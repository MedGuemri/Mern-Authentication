import PasswordCreteria from "./PasswordCreteria";







const PasswordStrenghtMeter = ({password}) => {
    const getStrength = (pass) => {
		let strength = 0;
		if (pass.length >= 6) strength++;
		if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
		if (pass.match(/\d/)) strength++;
		if (pass.match(/[^a-zA-Z\d]/)) strength++;
		return strength;}

        const strength = getStrength(password);

    
        const getStrengthDetailsText = (strength) => {
                if (strength === 0) return {strengthText:"Very Weak",strengthColor:"bg-red-500" } ;
                if (strength === 1) return {strengthText:"Weak",strengthColor:"bg-red-600" };
                if (strength === 2) return {strengthText:"Fair",strengthColor:"bg-orange-500" };
                if (strength === 3) return {strengthText:"Good",strengthColor:"bg-yellow-400" } ;
                return {strengthText:"Strong",strengthColor:"bg-green-500" } ;
            };

            const { strengthText, strengthColor } = getStrengthDetailsText(strength)
  return (
    <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
        <span className='text-xs text-gray-400'>Password strength</span>
        <span className='text-xs text-gray-400'>{strengthText}</span>


        </div>
        <div className="flex space-x-1">
            {[ ...Array(4)].map((_,index)=>(
                <div key={index} className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                    ${index < strength ? strengthColor : "bg-gray-600"}
                  `} />
            ))}


        </div>
      <PasswordCreteria password={password }/>
    </div>
  )
}

export default PasswordStrenghtMeter
