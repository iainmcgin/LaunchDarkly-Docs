/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useEffect } from 'react'
import { LanguageName } from './languages'
import { useCodeSnippetContext } from './codeContext'

export type CodeBlockProps = { snippetId: string; children: string; className: string }

export function CodeBlock({ snippetId, children, className = '' }: CodeBlockProps): ReactElement {
  const [language] = className.replace(/language-/, '').split(' ') as LanguageName[]
  const { snippets, setLanguage, unsetLanguage } = useCodeSnippetContext()

  useEffect(() => {
    if (!snippetId) {
      console.warn('You need to specify a snippetId when using CodeBlock')
      return
    }
    const languages = snippets[snippetId]

    // Avoid duplicates
    if (languages && languages.find(({ language: l }) => l === language)) {
      return
    }

    setLanguage(snippetId, language, children)

    return () => {
      unsetLanguage(snippetId, language)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}