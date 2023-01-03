import React from 'react';

interface ChatContentProps {
  id: number;
  text: string;
  image: string;
}

export const ChatContent: React.FC<ChatContentProps> = ({ text, image }) => {
  return (
    <div className="w-full h-10 px-4 mb-4 flex justify-start items-center">
      <div className="relative min-w-0 h-10 bg-theme-100 border-sky-500 border rounded-xl flex-grow flex-shrink">
        <form className="relative flex">
          <input
            type="text"
            placeholder="Enter messages..."
            className="w-full relative p-4 h-10 bg-theme-100 rounded-md focus:outline-none"
            data-chat-room-channel-target="message_input"
            autoComplete="off"
          />
          <div className="pr-4 pt-1">
            <label className="align-middle">
              <i className="fas fa-image text-3xl text-gray-800 hover:text-gray-500 cursor-pointer"></i>
              <input
                type="file"
                data-chat-room-channel-target="file_upload"
                className="hidden"
              />
            </label>
          </div>
        </form>
      </div>
      <div className="pl-4">
        <button
          type="submit"
          data-chat-room-channel-target="submit_btn"
          data-action="click->chat-room-channel#remove_value"
          className="chat-fill-btn cursor-pointer"
        >
          SEND
        </button>
      </div>
    </div>
  );
};
