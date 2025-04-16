import './DetailQuestions.scss';
import { FaCheckCircle } from 'react-icons/fa';

const DetailQuestions = () => {
    const QandAData = [
        {
          question: "What is the fabric of this dress?",
          answer: "Our dress is made of 100% cotton and has a breathable structure.",
          username: "Alice Johnson",
          avatar: "https://i.pravatar.cc/50?img=6",
          company: "Elegant Attire"
        },
        {
          question: "Is it machine washable?",
          answer: "Yes, you can wash it on a delicate cycle at 30 degrees. However, do not use bleach.",
          username: "Michael Smith",
          avatar: "https://i.pravatar.cc/50?img=14",
          company: "Elegant Attire"
        },
        {
          question: "How can I determine the right size for me?",
          answer: "You can check the size chart on the product page to find the best fit for you.",
          username: "Emma Davis",
          avatar: "https://i.pravatar.cc/50?img=22",
          company: "Elegant Attire"
        },
        {
          question: "Can I return or exchange the product?",
          answer: "Yes, you can return or exchange it within 14 days. The product must be unused.",
          username: "David Brown",
          avatar: "https://i.pravatar.cc/50?img=7",
          company: "Elegant Attire"
        },
        {
          question: "Does this dress shrink after washing?",
          answer: "No, our dresses are pre-shrunk and tested to ensure they maintain their original fit and size even after multiple washes.",
          username: "Sophia Miller",
          avatar: "https://i.pravatar.cc/50?img=15",
          company: "Elegant Attire"
        },
        {
          question: "Is this dress suitable for formal occasions?",
          answer: "Absolutely! This dress is designed with high-quality fabric and a sophisticated cut, making it perfect for both formal and casual events.",
          username: "William Taylor",
          avatar: "https://i.pravatar.cc/50?img=12",
          company: "Elegant Attire"
        }
      ];
    
    return (
        <div className="detail-questions">
            {
                QandAData.map((item, index) => (
                    <div className="Qna-section" key={index}>
                        <div className="question">
                            <div className="question__header">
                                <div className="avatar">
                                    <img src={item.avatar} alt={item.username} />
                                </div>
                                <div className="username"> { item.username }</div>
                            </div>
                            <div className="question__body">
                                {item.question}
                            </div>
                        </div>
                        <div className="answer">
                            <div className="answer_brand"> <FaCheckCircle /> { item.company }</div>
                            <div className="answer_body">{item.answer}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default DetailQuestions