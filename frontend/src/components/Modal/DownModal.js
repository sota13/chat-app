import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DownModal({isOpen,children}) {

  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.3,
        delayChildren: 0.4
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.3,
        delay: 0.4
      }
    }
  };

  const exitVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.2,
      }
    }
  };

  
  return (
    <div className="modal-component">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className="modal-overlay"
          >
            <motion.div
              className="modal"
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              variants={exitVariants}
              exit="hidden"
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DownModal