import React from 'react'
import { Link } from 'react-router-dom'

function Card({ title, subtitle, content, color, id }) {
    return (
        <div className="h-full card">
            <div className={`${color.bg} h-full rounded-xl p-6 ${color.txt} relative overflow-hidden`}>
                <div className="justify-center gap-3 h-full flex flex-col">
                    <h2 className="text-4xl  font-bold mb-1"> {title}</h2>
                    <p className="text-xl mb-4">{subtitle}</p>
                    <p className="text-sm mb-8 opacity-80">{content}</p>
                    <Link className='cursor-pointer' to={`post/${id}`}>
                        <button className="bg-white cursor-pointer text-blue-950 rounded-full px-4 py-1 text-sm font-medium flex items-center">
                            Read More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card