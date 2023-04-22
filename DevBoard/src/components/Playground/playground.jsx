import React, { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {html} from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import {Box, Button, Flex, useMediaQuery} from '@chakra-ui/react';
import { FaCopy } from 'react-icons/fa';
import { Text } from '@chakra-ui/react'

function Playground() {
  const [htmldata, setHtml] = useLocalStorage('html', '')
  const [cssdata, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
    const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
    const [isSmallerThan1200] = useMediaQuery('(max-width: 1200px)');


    useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${htmldata}</body>
          <style>${cssdata}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [htmldata, cssdata, js])

  const copyToClipboard= (editor) => {
    navigator.clipboard.writeText(editor);

  };

  return (
      <Flex w={isSmallerThan1000 ? '100%' : '98%'}
            h="80vh"
            mt={10}
            flexDirection="column"
            gap={5}
            bgColor="bgPrimary"
            style={{'backdrop-filter': 'blur(15px)'}}
            borderRadius="md"
            boxShadow="lg"
            p="4"
            zIndex={1}>         
          <Box w="100%" h="50%" display="flex" flexDirection={isSmallerThan1200 ? 'column' : 'row'}>
                <Box h="100%" w="100%" display="flex" flexDirection="column">

                      <CodeMirror
                          value={js}
                          placeholder='Please enter the JavaScript code.'
                          width="100%"
                          height={isSmallerThan1200 ? "115px" : "360px"}
                          theme={okaidia}
                          style={{border: "4px solid rgba(219, 231, 255, 0.2)"}}
                          extensions={[javascript({ jsx: true })]}
                          onChange={setJs}
                          
                      /> 
                  <Button w='5px' pos='absolute' zIndex = '15' right='5' onClick={() => copyToClipboard(cssdata)}> <FaCopy /> </Button>
                </Box>

                  <Box h="100%" w="100%" display="flex" right='5' flexDirection="column">
                      <CodeMirror
                          value={htmldata}
                          placeholder='Please enter the Html code.'
                          height={isSmallerThan1200 ? "115px" : "360px"}
                          width="100%"
                          theme={okaidia}
                          style={{border: "4px solid rgba(219, 231, 255, 0.2)"}}
                          extensions={[html({
                              matchClosingTags: true
                          })]}
                          onChange={setHtml}
                      />
                    <Button w='4px' pos='absolute' right='5' zIndex = '15' onClick={() => copyToClipboard(cssdata)}> <FaCopy /> </Button>
                  </Box>

                  <Box h="100%" w="100%" display="flex" flexDirection="column">
                  
                      <CodeMirror
                          placeholder='Please enter the Css code.'
                          value={cssdata}
                          height={isSmallerThan1200 ? "115px" : "360px"}
                          width="100%"
                          theme={okaidia}
                          style={{border: "4px solid rgba(219, 231, 255, 0.2)"}}
                          extensions={[css()]}
                          onChange={setCss}
                      />
                      <Button w='5px' pos='absolute' right='5' zIndex = '15' onClick={() => copyToClipboard(cssdata)}> <FaCopy /> </Button>
                  </Box>


          </Box>

          <Box  w="100%"
                h={["40%", "40%", "40%", "40%", "40%", "40%", "50%"]}
                mt={["20px", "20px", "20px", "20px", "20px", "20px", "0px"]}
                display="flex"
                alignItems="flex-end">

                  <iframe
                      srcDoc={srcDoc}
                      title="output"
                      sandbox="allow-same-origin"
                      width="100%"
                      height="95%"
                      style={{backgroundColor: "#272822", border: "7px solid rgba(219, 231, 255, 0.2)", paddingTop: "10px"}}
                  />
          </Box>


      </Flex>
  )
}

export default Playground;