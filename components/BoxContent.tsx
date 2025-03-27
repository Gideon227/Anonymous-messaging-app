import Image from 'next/image';

interface BoxContentProps {
  text: string;
  name: string;
  className?: string;
}

export const BoxContent = ({ text, name, className = '' }: BoxContentProps) => {
  return (
    <div>
      <div className={`flex justify-center items-center mx-2 ${className}`}>
        <div className="rounded-xl border border-[#e5e7eb] bg-white text-[#08080A] shadow overflow-hidden w-[350px] max-md:w-[210px]">
          <div className="flex flex-col flex-1 p-4 gap-2 max-md:gap-[2px] max-md:p-3">
            <div className="flex gap-2 items-center">
              <Image
                src="/person.png"
                width={30}
                height={40}
                alt="person"
                objectFit="cover"
                className="rounded-full p-1"
              />
              <div>
                <h3 className="font-semibold text-[16px] max-md:text-[12px]">{name}</h3>
              </div>
            </div>
            <div>
              <p className="text-sm text-[#12141D] max-md:text-[11px] max-md:leading-4">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxContent;
