import React from 'react'

function Input({title, id, placeholder, setInput, autoComplete=true}) {
    return (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <input autoComplete={autoComplete} onChange={(e)=>setInput(e.target.value)} type={id} id={id} name={id} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required="" />
        </div>
    )
}

export default Input