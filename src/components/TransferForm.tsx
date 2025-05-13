
import React, { useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowRight } from "lucide-react";
import { createTransferPayload, isValidAmount } from "@/utils/aptosUtils";
import { toast } from "@/hooks/use-toast";
import { InputTransactionData } from '@aptos-labs/ts-sdk';

const TransferForm = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };
  
  const isValidRecipient = (address: string): boolean => {
    // Basic validation - should be a 0x followed by 64 hex chars
    return /^0x[a-fA-F0-9]{64}$/.test(address);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!recipient || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidRecipient(recipient)) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid recipient address",
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidAmount(amount)) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const payload = createTransferPayload(recipient, amount);
      // Convert to InputTransactionData format
      const transactionPayload: InputTransactionData = {
        data: payload
      };
      
      const response = await signAndSubmitTransaction(transactionPayload);
      
      console.log("Transaction submitted:", response);
      
      toast({
        title: "Transaction Submitted",
        description: "Your transfer has been submitted successfully",
      });
      
      // Reset form
      setRecipient("");
      setAmount("");
    } catch (error) {
      console.error("Transaction error:", error);
      toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Send APT</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="recipient">
            Recipient Address
          </label>
          <Input
            id="recipient"
            placeholder="0x..."
            value={recipient}
            onChange={handleRecipientChange}
            disabled={isSubmitting || !account}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="amount">
            Amount (APT)
          </label>
          <Input
            id="amount"
            placeholder="0.0"
            value={amount}
            onChange={handleAmountChange}
            disabled={isSubmitting || !account}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting || !account}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Send <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default TransferForm;
