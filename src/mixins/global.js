import { minLength, required, email } from "vuelidate/lib/validators";



export const vuelidate = {
    validations:{
        name:{
            required,
            minLength:minLength(3),
        },
        surname:{
            required,
            minLength:minLength(3)
        },
        email:{
            required,
            email,
        },
        password:{
            required,
            minLength:minLength(6)
        }
    }
}