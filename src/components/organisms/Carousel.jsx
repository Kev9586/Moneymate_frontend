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
          <motion.div key={index} className="w-64 shrink-0 p-2">
            <Card>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p>{item.content}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Carousel;