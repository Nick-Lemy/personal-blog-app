import React from 'react'
import ReactMarkdown from 'react-markdown'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

function Card({ title, subtitle, color, id, date }) {
    const timeAgo = new TimeAgo('en-US')
    return (
        <div className="h-full card">
            <div className={`${color.bg} h-full rounded-xl p-6 ${color.txt} relative overflow-hidden`}>
                <div className="justify-between gap-3 h-full flex flex-col">
                    <h2 className="md:text-4xl text-2xl font-medium mb-1"> {title}</h2>
                    <p className="text-xl font-light text-gray-400 md:text-lg mb-4">{subtitle}</p>
                    {/* <ReactMarkdown style={{ color: 'red' }}>
                        {content}
                    </ReactMarkdown> */}
                    <div className='flex justify-between items-center'>
                        <a href={`/post/${id}`} className="bg-white w-fit cursor-pointer text-blue-950 rounded-full px-4 py-1 text-sm font-medium flex items-center">
                            Read More
                        </a>
                        <p className='text-xs font-light text-gray-300'>{timeAgo.format(new Date(date))}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card