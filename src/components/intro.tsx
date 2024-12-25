import Wrapper from "./wrapper";

function Introduction() {
    return (
        <Wrapper className="mt-2 mb-5">
            <div className="max-w-3xl lg:max-w-5xl mx-auto my-10 flex flex-col gap-5">
                <div className="flex justify-center">
                    <p className="font-bold text-5xl">Focus mate</p>
                </div>
                <div className="flex justify-center">
                    <p className="text-2xl text-center">
                        A customizable pomodoro timer that works on desktop & mobile browser. The aim of this app is to help you focus on any task you are working on, such as study, writing, or coding
                    </p>
                </div>
            </div>
        </Wrapper>
    );
}

export default Introduction;