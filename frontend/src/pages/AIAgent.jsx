import { useState, useRef } from 'react';
import { Database, ChevronDown, Sparkles, Plus, Mic, Send, BarChart2, Package, Truck, Users, FileText, ArrowRight } from 'lucide-react';

import { ClaudeLogo, ChatGPTLogo, GrokLogo, GeminiLogo } from '../components/IntegrationLogos';

const suggestedPrompts = [
{ text: 'Show me top selling products', icon: BarChart2 },
{ text: 'Which items are low in stock?', icon: Package },
{ text: 'Show delayed deliveries', icon: Truck },
{ text: 'Which customers haven\'t purchased recently?', icon: Users },
{ text: 'Create a monthly sales report', icon: FileText }];


const integrationCards = [
{
  name: 'Claude',
  desc: 'Set up the Dreamz AI MCP in Claude in under a minute.',
  logo: <ClaudeLogo />
},
{
  name: 'ChatGPT',
  desc: 'Use the same Dreamz MCP inside ChatGPT.',
  logo: <ChatGPTLogo />
},
{
  name: 'Grok',
  desc: 'Automate tasks using Grok\'s advanced AI.',
  logo: <GrokLogo />
},
{
  name: 'Gemini',
  desc: 'Connect to Google Gemini for seamless workflows.',
  logo: <GeminiLogo />
}];


export default function AIAgent() {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  const handlePromptClick = (text) => {
    setInputValue(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Simulated interaction sent: "${inputValue}"`);
      setInputValue('');
      setIsSubmitting(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="page-content">
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 className="page-title">AI Agent</h1>
          <p className="page-subtitle">Ask. Analyze. Act. Across all your business systems.</p>
        </div>
        
        <div className="system-dropdown">
          <Database size={16} />
          All Systems
          <ChevronDown size={14} style={{ marginLeft: '4px' }} />
        </div>
      </div>

      <div className="ai-integrations-section">
        <div className="integrations-header">
          <h3 className="integrations-title">Power your workflow with AI</h3>
          <p className="integrations-subtitle">Seamlessly integrate Dreamz AI with your favorite AI assistants to automate your business systems directly from your chat.</p>
        </div>
        <div className="integrations-grid">
          {integrationCards.map((card, idx) =>
          <div key={idx} className="integration-card">
              <div className="integration-logo-wrapper">
                {card.logo}
              </div>
              <div className="integration-info">
                <h4>Connect with {card.name}</h4>
                <p>{card.desc}</p>
              </div>
              <div className="integration-action">
                <span>Connect</span>
                <ArrowRight size={14} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="ai-workspace">

        <div className={`ai-input-container ${isFocused ? 'focused' : ''}`}>
          <div className="ai-input-top">
            <Sparkles size={20} className="ai-input-icon" />
            <textarea
              ref={inputRef}
              className="ai-input"
              placeholder="Ask anything about your business..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              rows={1} />
            
          </div>
          
          <div className="ai-input-bottom">
            <div className="ai-input-left">
              <button className="btn-icon">
                <Plus size={18} />
              </button>
              <button className="system-dropdown" style={{ padding: '0.4rem 0.75rem', borderColor: 'transparent', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
                All Systems <ChevronDown size={14} />
              </button>
            </div>
            
            <div className="ai-input-right">
              <Mic size={20} className="mic-icon" />
              <button
                className="btn-send"
                onClick={handleSend}
                disabled={!inputValue.trim() || isSubmitting}>
                
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="suggested-prompts">
          {suggestedPrompts.map((prompt, index) =>
          <div
            key={index}
            className="prompt-chip"
            onClick={() => handlePromptClick(prompt.text)}>
            
              <prompt.icon size={14} />
              {prompt.text}
            </div>
          )}
        </div>

        <div className="ai-branding">
          <div className="branding-text">
            Powered by <span className="branding-highlight">Dreamz AI</span>
          </div>
          <div className="branding-subtext">
            Your entire business. One intelligent conversation.
          </div>
        </div>
      </div>
    </div>);

}