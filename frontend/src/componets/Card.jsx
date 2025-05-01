import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

function Card({ title, subtitle, content, color, id }) {
    const navigate = useNavigate()
    return (
        <div className="h-full card">
            <div className={`${color.bg} h-full rounded-xl p-6 ${color.txt} relative overflow-hidden`}>
                <div className="justify-between gap-3 h-full flex flex-col">
                    <h2 className="md:text-4xl text-2xl  font-bold mb-1"> {title}</h2>
                    <p className="text-xl md:text-lg mb-4">{subtitle}</p>
                    <ReactMarkdown style={{ color: 'red'}}>
                        {content}
                    </ReactMarkdown>
                    <button onClick={e=>{
                        e.preventDefault()
                        navigate(`/post/${id}`)
                    }} className="bg-white w-fit cursor-pointer text-blue-950 rounded-full px-4 py-1 text-sm font-medium flex items-center">
                        Read More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card