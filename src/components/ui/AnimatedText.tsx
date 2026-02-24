
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
  type?: 'words' | 'chars' | 'lines'
}

export default function AnimatedText({
  children,
  className = '',
  delay = 0,
  type = 'words',
}: AnimatedTextProps) {
  const { ref, isInView } = useInView({ threshold: 0.3, once: true })

  const items = type === 'chars' 
    ? children.split('') 
    : type === 'lines'
    ? children.split('\n')
    : children.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: type === 'chars' ? 0.02 : 0.08,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ marginRight: type !== 'chars' ? '0.25em' : undefined }}
        >
          {item}
          {type === 'chars' && item === ' ' && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  )
}