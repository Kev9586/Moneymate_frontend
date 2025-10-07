import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Card from '../molecules/Card';

const Carousel = ({ items }) => {
  const constraintsRef = useRef(null);

  return (
    <motion.div ref={constraintsRef} className="overflow-hidden">
      <motion.div
        className="flex"
        drag="x"
        dragConstraints={constraintsRef}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      >
        {items.map((item, index) => (
          <motion.div key={index} className="flex-shrink-0 w-64 p-2">
            <Card>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p>{item.content}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Carousel;